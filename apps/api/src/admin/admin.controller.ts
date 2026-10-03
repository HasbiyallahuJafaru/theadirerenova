import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

class UpdateOrderStatusDto {
  @IsIn(['pending', 'paid', 'fulfilled', 'shipped', 'delivered', 'cancelled', 'refunded'])
  status!: string;
}

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('dashboard')
  dashboard() {
    return this.prisma.order.aggregate({
      _count: { _all: true },
      _sum: { totalKobo: true },
      where: { status: { in: ['paid', 'fulfilled', 'shipped', 'delivered'] } },
    });
  }

  @Get('orders')
  orders(@Query('status') status?: string, @Query('take') take?: string) {
    return this.prisma.order.findMany({
      where: status ? { status: status as never } : undefined,
      include: { items: true, customer: { select: { fullName: true, phone: true } } },
      orderBy: { placedAt: 'desc' },
      take: Math.min(Number(take ?? 50), 100),
    });
  }

  @Patch('orders/:id/status')
  updateStatus(@Param('id') id: string, body: UpdateOrderStatusDto) {
    return this.prisma.order.update({ where: { id }, data: { status: body.status as never } });
  }

  @Get('customers')
  customers() {
    return this.prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { orders: true } } },
      take: 100,
    });
  }

  @Get('inventory/low')
  lowStock(@Query('threshold') threshold?: string) {
    const t = Number(threshold ?? 3);
    return this.prisma.productVariant.findMany({
      where: { stock: { lte: t } },
      include: { product: { select: { name: true, slug: true } } },
      orderBy: { stock: 'asc' },
    });
  }
}
