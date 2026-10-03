import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UploadsController } from './uploads.controller';
import { R2Service } from './r2.service';

@Module({
  imports: [AuthModule],
  controllers: [UploadsController],
  providers: [R2Service],
})
export class UploadsModule {}
