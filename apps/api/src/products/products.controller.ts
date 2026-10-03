import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(
    @Query('category') category?: string,
    @Query('collection') collection?: string,
    @Query('featured') featured?: string,
    @Query('sort') sort?: 'newest' | 'price-asc' | 'price-desc',
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.products.listPublic({
      category,
      collection,
      featured: featured === undefined ? undefined : featured === 'true',
      sort,
      take: take ? Number(take) : undefined,
      cursor,
    });
  }

  @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.products.getBySlug(slug);
  }

  @Get(':slug/related')
  related(@Param('slug') slug: string) {
    return this.products.getBySlug(slug).then((p) => this.products.related(p.id, p.categoryId));
  }
}
