import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  async findAll(onlyActive = true) {
    const where: any = {};
    if (onlyActive) where.isActive = true;
    return this.prisma.banner.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.banner.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.banner.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.banner.delete({ where: { id } });
  }
}
