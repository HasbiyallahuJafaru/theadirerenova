import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OrdersService } from './orders.service';

class ItemDto {
  @IsString()
  variantId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

class AddressDto {
  @IsString() @MinLength(2) fullName!: string;
  @IsString() @MinLength(7) phone!: string;
  @IsOptional() @IsString() email?: string;
  @IsString() state!: string;
  @IsString() city!: string;
  @IsString() @MinLength(4) street!: string;
  @IsOptional() @IsString() @MaxLength(120) landmark?: string;
}

class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items!: ItemDto[];

  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress!: AddressDto;

  @IsOptional() @IsInt() @Min(0) shippingKobo?: number;
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create({
      items: dto.items,
      shippingAddress: dto.shippingAddress,
      shippingKobo: dto.shippingKobo,
    });
  }

  @Get(':reference')
  status(@Param('reference') reference: string) {
    return this.orders.getByReference(reference);
  }
}
