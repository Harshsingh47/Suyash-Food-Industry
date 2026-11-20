import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  async findBySlug(slug: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isPublished: true },
          include: {
            images: { orderBy: { order: 'asc' } },
            variations: true,
            category: true,
          },
        },
      },
    });
    if (!brand) throw new NotFoundException(`Brand '${slug}' not found`);
    return brand;
  }

  async create(data: any) {
    return this.prisma.brand.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.brand.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.brand.delete({ where: { id } });
  }
}
