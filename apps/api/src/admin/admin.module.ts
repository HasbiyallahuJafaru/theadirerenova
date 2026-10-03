import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminProductsController } from './admin-products.controller';

@Module({
  imports: [AuthModule],
  controllers: [AdminController, AdminProductsController],
})
export class AdminModule {}
