import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async findAll(publishedOnly = true) {
    const where: any = {};
    if (publishedOnly) where.isPublished = true;
    return this.prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) throw new NotFoundException(`Blog post '${slug}' not found`);
    return post;
  }

  async create(data: any) {
    return this.prisma.blogPost.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
