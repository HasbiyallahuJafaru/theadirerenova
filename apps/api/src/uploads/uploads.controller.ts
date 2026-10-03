import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { R2Service } from './r2.service';

class PresignDto {
  @IsString()
  contentType!: string;

  @IsIn(['products', 'collections', 'ig'])
  folder!: 'products' | 'collections' | 'ig';
}

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private r2: R2Service) {}

  @Post('presign')
  presign(@Body() dto: PresignDto) {
    return this.r2.presignUpload(dto.contentType, dto.folder);
  }
}
