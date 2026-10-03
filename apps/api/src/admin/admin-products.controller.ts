import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@ApiTags('admin-products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.product.findMany({
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
        category: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  create(@Body() data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ProductUncheckedUpdateInput) {
    return this.prisma.product.update({ where: { id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  @Post(':id/images')
  addImage(@Param('id') id: string, @Body() body: { url: string; alt?: string; position?: number }) {
    return this.prisma.productImage.create({
      data: { productId: id, url: body.url, alt: body.alt, position: body.position ?? 0 },
    });
  }

  @Post(':id/variants')
  addVariant(
    @Param('id') id: string,
    @Body() body: { name: string; sku: string; priceKobo: number; stock: number },
  ) {
    return this.prisma.productVariant.create({ data: { productId: id, ...body } });
  }

  /** Converts an imported Instagram post into a draft product. */
  @Post('from-instagram/:postId')
  async fromInstagram(@Param('postId') postId: string, @Body() body: { categoryId: string }) {
    const post = await this.prisma.instagramPost.findUniqueOrThrow({ where: { id: postId } });
    const name = (post.caption ?? 'Untitled Adire').slice(0, 60);
    const slug = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}-${Date.now().toString(36)}`;
    return this.prisma.product.create({
      data: {
        slug,
        name,
        description: post.caption ?? '',
        categoryId: body.categoryId,
        basePriceKobo: 0,
        instagramPostId: post.id,
        images: { create: { url: post.mediaUrl, alt: name } },
      },
    });
  }
}
