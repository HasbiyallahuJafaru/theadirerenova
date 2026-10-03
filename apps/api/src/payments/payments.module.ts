import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsController } from './payments.controller';
import { PaystackService } from './paystack.service';

@Module({
  imports: [OrdersModule],
  controllers: [PaymentsController],
  providers: [PaystackService],
})
export class PaymentsModule {}
