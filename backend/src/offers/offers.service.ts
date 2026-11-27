import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // Standard Promotional Banners (Existing)
  // ==========================================

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

  // ==========================================
  // Multi-Product Combo Offers (New Feature)
  // ==========================================

  async findCombos(onlyActive = true) {
    const where: any = {};
    if (onlyActive) {
      where.isActive = true;
    }
    return this.prisma.comboOffer.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { orderBy: { order: 'asc' }, take: 1 },
                category: { select: { id: true, name: true, slug: true } },
                variations: { orderBy: { regularPrice: 'asc' } },
              },
            },
          },
        },
      },
    });
  }

  async findComboByIdOrSlug(idOrSlug: string) {
    const combo = await this.prisma.comboOffer.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { orderBy: { order: 'asc' } },
                category: { select: { id: true, name: true, slug: true } },
                variations: true,
              },
            },
          },
        },
      },
    });
    if (!combo) throw new NotFoundException(`Combo Offer '${idOrSlug}' not found`);
    return combo;
  }

  async createCombo(data: any) {
    const { items, ...rest } = data;
    const slug =
      rest.slug ||
      rest.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const originalPrice = Number(rest.originalPrice || 0);
    const salePrice = Number(rest.salePrice || 0);
    const savingsAmount =
      rest.savingsAmount !== undefined
        ? Number(rest.savingsAmount)
        : Math.max(0, originalPrice - salePrice);
    const discountPercentage =
      rest.discountPercentage !== undefined
        ? Number(rest.discountPercentage)
        : originalPrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    const startDate = rest.startDate ? new Date(rest.startDate) : null;
    const endDate = rest.endDate ? new Date(rest.endDate) : null;

    return this.prisma.comboOffer.create({
      data: {
        ...rest,
        slug,
        originalPrice,
        salePrice,
        savingsAmount,
        discountPercentage,
        startDate,
        endDate,
        items:
          items && items.length > 0
            ? {
                create: items.map((it: any) => ({
                  productId: it.productId,
                  quantity: Number(it.quantity || 1),
                  customNote: it.customNote || null,
                })),
              }
            : undefined,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async updateCombo(id: string, data: any) {
    const { items, ...rest } = data;

    const originalPrice = Number(rest.originalPrice || 0);
    const salePrice = Number(rest.salePrice || 0);
    const savingsAmount =
      rest.savingsAmount !== undefined
        ? Number(rest.savingsAmount)
        : Math.max(0, originalPrice - salePrice);
    const discountPercentage =
      rest.discountPercentage !== undefined
        ? Number(rest.discountPercentage)
        : originalPrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    const startDate =
      rest.startDate !== undefined
        ? rest.startDate
          ? new Date(rest.startDate)
          : null
        : undefined;
    const endDate =
      rest.endDate !== undefined
        ? rest.endDate
          ? new Date(rest.endDate)
          : null
        : undefined;

    const updateData: any = {
      ...rest,
      originalPrice,
      salePrice,
      savingsAmount,
      discountPercentage,
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
    };

    if (items && Array.isArray(items)) {
      await this.prisma.comboOfferItem.deleteMany({
        where: { comboOfferId: id },
      });
      updateData.items = {
        create: items.map((it: any) => ({
          productId: it.productId,
          quantity: Number(it.quantity || 1),
          customNote: it.customNote || null,
        })),
      };
    }

    return this.prisma.comboOffer.update({
      where: { id },
      data: updateData,
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteCombo(id: string) {
    return this.prisma.comboOffer.delete({ where: { id } });
  }

  async toggleComboActive(id: string) {
    const combo = await this.prisma.comboOffer.findUnique({ where: { id } });
    if (!combo) throw new NotFoundException('Combo Offer not found');
    return this.prisma.comboOffer.update({
      where: { id },
      data: { isActive: !combo.isActive },
    });
  }
}
