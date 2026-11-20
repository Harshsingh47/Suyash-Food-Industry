import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { lowStock?: boolean; outOfStock?: boolean; search?: string }) {
    const where: any = {};

    if (query.outOfStock) {
      where.OR = [{ stockQuantity: 0 }, { isInStock: false }];
    } else if (query.lowStock) {
      where.stockQuantity = { lte: 10 };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      select: {
        id: true,
        sku: true,
        name: true,
        stockQuantity: true,
        lowStockThreshold: true,
        isInStock: true,
        category: { select: { name: true } },
        variations: {
          select: { id: true, name: true, sku: true, stockQuantity: true },
        },
      },
      orderBy: { stockQuantity: 'asc' },
    });
  }

  async adjustStock(dto: {
    productId: string;
    newStock: number;
    reason: string;
    userId: string;
  }) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    const previousStock = product.stockQuantity;
    const changeQuantity = dto.newStock - previousStock;

    const [updatedProduct, history] = await this.prisma.$transaction([
      this.prisma.product.update({
        where: { id: dto.productId },
        data: {
          stockQuantity: dto.newStock,
          isInStock: dto.newStock > 0,
        },
      }),
      this.prisma.inventoryHistory.create({
        data: {
          productId: dto.productId,
          previousStock,
          newStock: dto.newStock,
          changeQuantity,
          reason: dto.reason || 'Manual Admin Adjustment',
          adjustedByUserId: dto.userId,
        },
      }),
    ]);

    return { updatedProduct, history };
  }

  async getHistory(productId: string) {
    return this.prisma.inventoryHistory.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: { adjustedBy: { select: { id: true, name: true } } },
    });
  }
}
