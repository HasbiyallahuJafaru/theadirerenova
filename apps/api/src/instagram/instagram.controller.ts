import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('instagram')
@Controller('instagram')
export class InstagramController {
  constructor(private prisma: PrismaService) {}

  @Get('posts')
  posts(@Query('take') take?: string) {
    return this.prisma.instagramPost.findMany({
      orderBy: { postedAt: 'desc' },
      take: Math.min(Number(take ?? 12), 30),
    });
  }
}
