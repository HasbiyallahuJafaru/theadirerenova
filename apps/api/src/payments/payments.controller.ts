import { BadRequestException, Controller, Get, Param, Post, Body, Req, RawBodyRequest } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import type { Request } from 'express';
import { PaystackService } from './paystack.service';
import { PrismaService } from '../prisma/prisma.service';

class InitDto {
  @IsString()
  orderReference!: string;
}

@ApiTags('payments')
@Controller('payments/paystack')
export class PaymentsController {
  constructor(
    private paystack: PaystackService,
    private prisma: PrismaService,
  ) {}

  @Post('init')
  init(@Body() dto: InitDto) {
    return this.paystack.init(dto.orderReference);
  }

  @Post('webhook')
  webhook(@Req() req: RawBodyRequest<Request>) {
    const raw = req.rawBody?.toString('utf8');
    if (!raw || !this.paystack.verifyWebhookSignature(raw, req.headers['x-paystack-signature'] as string)) {
      throw new BadRequestException('Invalid signature');
    }
    return this.paystack.handleWebhook(JSON.parse(raw));
  }

  /** Client-side callback verification fallback (defense in depth). */
  @Get('verify/:reference')
  async verify(@Param('reference') reference: string) {
    const payment = await this.prisma.payment.findUnique({ where: { providerRef: reference } });
    return { status: payment?.status ?? 'unknown' };
  }
}
