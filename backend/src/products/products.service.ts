import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    search?: string;
    featured?: boolean;
    bestSeller?: boolean;
    minPrice?: number;
    maxPrice?: number;
    publishedOnly?: boolean;
    sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest';
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.publishedOnly !== false) {
      where.isPublished = true;
    }

    if (query.category) {
      where.category = {
        OR: [
          { slug: query.category },
          { id: query.category },
          { name: { contains: query.category, mode: 'insensitive' } },
        ],
      };
    }

    if (query.brand) {
      where.brand = {
        OR: [
          { slug: query.brand },
          { id: query.brand },
          { name: { contains: query.brand, mode: 'insensitive' } },
        ],
      };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
        { shortDescription: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.featured) {
      where.isFeatured = true;
    }

    if (query.bestSeller) {
      where.isBestSeller = true;
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.salePrice = {};
      if (query.minPrice !== undefined) where.salePrice.gte = Number(query.minPrice);
      if (query.maxPrice !== undefined) where.salePrice.lte = Number(query.maxPrice);
    }

    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'price_asc') orderBy = { salePrice: 'asc' };
    else if (query.sortBy === 'price_desc') orderBy = { salePrice: 'desc' };
    else if (query.sortBy === 'name') orderBy = { name: 'asc' };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          brand: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { order: 'asc' } },
          variations: { orderBy: { regularPrice: 'asc' } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: 'asc' } },
        variations: { orderBy: { regularPrice: 'asc' } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug '${slug}' not found`);
    }

    // Related products from same category
    const relatedProducts = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isPublished: true,
      },
      take: 4,
      include: {
        images: true,
        category: true,
      },
    });

    return {
      ...product,
      relatedProducts,
    };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { order: 'asc' } },
        variations: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: any, userId?: string) {
    const { images, variations, ...rest } = data;

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        images: images?.length
          ? {
              create: images.map((img: any, idx: number) => ({
                url: img.url,
                altText: img.altText || rest.name,
                isMain: idx === 0,
                order: idx,
              })),
            }
          : undefined,
        variations: variations?.length
          ? {
              create: variations.map((v: any) => ({
                name: v.name,
                weight: v.weight || v.name,
                regularPrice: Number(v.regularPrice || rest.regularPrice),
                salePrice: v.salePrice ? Number(v.salePrice) : null,
                stockQuantity: Number(v.stockQuantity || 100),
                sku: v.sku || `${rest.sku}-${v.name}`,
              })),
            }
          : undefined,
      },
      include: { images: true, variations: true, category: true },
    });

    if (userId) {
      await this.prisma.adminActivityLog.create({
        data: {
          userId,
          action: 'PRODUCT_CREATE',
          entityType: 'Product',
          entityId: product.id,
          details: `Created product ${product.name} (${product.sku})`,
        },
      });
    }

    return product;
  }

  async update(id: string, data: any, userId?: string) {
    const { images, variations, ...rest } = data;

    const product = await this.prisma.product.update({
      where: { id },
      data: rest,
      include: { images: true, variations: true, category: true },
    });

    if (userId) {
      await this.prisma.adminActivityLog.create({
        data: {
          userId,
          action: 'PRODUCT_UPDATE',
          entityType: 'Product',
          entityId: product.id,
          details: `Updated product ${product.name} (${product.sku})`,
        },
      });
    }

    return product;
  }

  async delete(id: string, userId?: string) {
    const product = await this.prisma.product.delete({
      where: { id },
    });

    if (userId) {
      await this.prisma.adminActivityLog.create({
        data: {
          userId,
          action: 'PRODUCT_DELETE',
          entityType: 'Product',
          entityId: id,
          details: `Deleted product ${product.name} (${product.sku})`,
        },
      });
    }

    return { message: 'Product deleted successfully', id };
  }
}
