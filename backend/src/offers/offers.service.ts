import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async findAll(onlyActive = true) {
    const where: any = {};
    if (onlyActive) {
      where.isActive = true;
    }
    return this.prisma.offer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        targetCategory: { select: { name: true, slug: true } },
        targetProduct: { select: { name: true, slug: true, sku: true } },
      },
    });
  }

  async create(data: any) {
    return this.prisma.offer.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.offer.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.offer.delete({ where: { id } });
  }
}
