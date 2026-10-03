import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface OrderItemInput {
  variantId: string;
  quantity: number;
}

export interface ShippingAddressInput {
  fullName: string;
  phone: string;
  email?: string;
  state: string;
  city: string;
  street: string;
  landmark?: string;
}

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeReference() {
  let ref = 'TAR-';
  for (let i = 0; i < 6; i++) ref += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  return ref;
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a pending order, snapshotting product/variant names and prices.
   * Stock is validated but only decremented after a successful Paystack webhook.
   */
  async create(input: {
    items: OrderItemInput[];
    shippingAddress: ShippingAddressInput;
    shippingKobo?: number;
    supabaseUid?: string | null;
  }) {
    if (!input.items?.length) throw new BadRequestException('Cart is empty');

    const variantIds = input.items.map((i) => i.variantId);
    const variants = await this.prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: { include: { images: { orderBy: { position: 'asc' }, take: 1 } } } },
    });
    if (variants.length !== new Set(variantIds).size) {
      throw new BadRequestException('One or more items are unavailable');
    }
    for (const item of input.items) {
      const variant = variants.find((v) => v.id === item.variantId)!;
      if (item.quantity < 1) throw new BadRequestException('Invalid quantity');
      if (variant.stock < item.quantity) {
        throw new BadRequestException(`Only ${variant.stock} left of ${variant.product.name} (${variant.name})`);
      }
    }

    const itemsData = input.items.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId)!;
      return {
        variantId: variant.id,
        productName: variant.product.name,
        variantName: variant.name,
        unitPriceKobo: variant.priceKobo,
        quantity: item.quantity,
        imageUrl: variant.product.images[0]?.url,
      };
    });
    const subtotalKobo = itemsData.reduce((sum, i) => sum + i.unitPriceKobo * i.quantity, 0);
    const shippingKobo = input.shippingKobo ?? 0;

    const a = input.shippingAddress;
    const customer = a.email
      ? await this.prisma.customer.upsert({
          where: { email: a.email },
          create: { email: a.email, phone: a.phone, fullName: a.fullName, supabaseUid: input.supabaseUid ?? null },
          update: { phone: a.phone, fullName: a.fullName },
        })
      : await this.prisma.customer.upsert({
          where: { phone: a.phone },
          create: { phone: a.phone, fullName: a.fullName, supabaseUid: input.supabaseUid ?? null },
          update: { fullName: a.fullName },
        });

    return this.prisma.order.create({
      data: {
        reference: makeReference(),
        customerId: customer.id,
        items: { create: itemsData },
        subtotalKobo,
        shippingKobo,
        totalKobo: subtotalKobo + shippingKobo - 0,
        shippingAddress: input.shippingAddress as unknown as Prisma.InputJsonValue,
      },
      include: { items: true },
    });
  }

  async getByReference(reference: string) {
    const order = await this.prisma.order.findUnique({
      where: { reference },
      include: { items: true, payments: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  /** Called from the verified Paystack webhook. */
  async markPaid(providerRef: string, amountKobo: number) {
    const payment = await this.prisma.payment.findUnique({ where: { providerRef } });
    if (!payment) throw new NotFoundException('Unknown payment reference');

    if (payment.status === 'success') return payment.orderId; // idempotent replay

    if (payment.amountKobo !== amountKobo) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed', gatewayResponse: { error: 'amount_mismatch' } },
      });
      throw new BadRequestException('Amount mismatch');
    }

    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: payment.orderId },
      include: { items: true },
    });

    await this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }
      await tx.order.update({
        where: { id: order.id },
        data: { status: 'paid', paidAt: new Date() },
      });
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'success' },
      });
    });
    return order.id;
  }
}
