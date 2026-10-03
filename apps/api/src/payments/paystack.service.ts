import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersService } from '../orders/orders.service';

const PAYSTACK_BASE = 'https://api.paystack.co';

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private orders: OrdersService,
  ) {}

  /** Initializes a Paystack transaction for an existing pending order. */
  async init(orderReference: string): Promise<{ authorizationUrl: string }> {
    const order = await this.prisma.order.findUnique({
      where: { reference: orderReference },
      include: { payments: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'pending') throw new Error('Order is not awaiting payment');

    const callbackUrl = `${this.config.get('WEB_URL', 'http://localhost:3000')}/order/${order.reference}`;

    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.get('PAYSTACK_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: (order.shippingAddress as { email?: string }).email ?? `${order.reference.toLowerCase()}@guest.tar.store`,
        amount: order.totalKobo,
        reference: order.reference,
        callback_url: callbackUrl,
        currency: 'NGN',
        metadata: { orderReference: order.reference },
      }),
    });
    const body = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };
    if (!body.status || !body.data) throw new Error(body.message || 'Paystack init failed');

    await this.prisma.payment.create({
      data: {
        orderId: order.id,
        providerRef: body.data.reference,
        amountKobo: order.totalKobo,
        status: 'initialized',
      },
    });

    return { authorizationUrl: body.data.authorization_url };
  }

  /** Verifies the x-paystack-signature header (HMAC SHA512 of raw body with secret key). */
  verifyWebhookSignature(rawBody: string, signature: string | undefined): boolean {
    if (!signature) return false;
    const expected = createHmac('sha512', this.config.get('PAYSTACK_SECRET_KEY', ''))
      .update(rawBody)
      .digest('hex');
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  async handleWebhook(event: { event: string; data: { reference: string; amount: number } }) {
    if (event.event === 'charge.success') {
      try {
        await this.orders.markPaid(event.data.reference, event.data.amount);
      } catch (err) {
        this.logger.error(`Webhook charge.success failed for ${event.data.reference}: ${err}`);
      }
    }
    return { received: true };
  }
}
