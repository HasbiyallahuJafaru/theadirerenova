import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const publicInclude = {
  images: { orderBy: { position: 'asc' as const } },
  variants: { orderBy: { priceKobo: 'asc' as const } },
  category: { select: { slug: true, name: true } },
  collections: { include: { collection: true } },
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listPublic(params: {
    category?: string;
    collection?: string;
    featured?: boolean;
    sort?: 'newest' | 'price-asc' | 'price-desc';
    take?: number;
    cursor?: string;
  }) {
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(params.category && { category: { slug: params.category } }),
      ...(params.collection && {
        collections: { some: { collection: { slug: params.collection } } },
      }),
      ...(params.featured !== undefined && { isFeatured: params.featured }),
    };
    const orderBy: Prisma.ProductOrderByWithRelationInput[] =
      params.sort === 'price-asc'
        ? [{ basePriceKobo: 'asc' }]
        : params.sort === 'price-desc'
          ? [{ basePriceKobo: 'desc' }]
          : [{ createdAt: 'desc' }];

    return this.prisma.product.findMany({
      where,
      include: publicInclude,
      orderBy,
      take: Math.min(params.take ?? 24, 60),
      ...(params.cursor && { cursor: { id: params.cursor }, skip: 1 }),
    });
  }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: publicInclude,
    });
    if (!product || !product.isActive) throw new NotFoundException('Product not found');
    return product;
  }

  related(productId: string, categoryId: string, take = 4) {
    return this.prisma.product.findMany({
      where: { isActive: true, categoryId, id: { not: productId } },
      include: publicInclude,
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
