import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async findAll(onlyActive = true) {
    const where: any = {};
    if (onlyActive) where.isActive = true;
    return this.prisma.testimonial.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.testimonial.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.testimonial.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
