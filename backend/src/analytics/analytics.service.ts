import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const [
      totalProducts,
      activeProducts,
      totalCategories,
      totalBrands,
      totalEnquiries,
      enquiryStatusGroups,
      lowStockProducts,
      recentEnquiries,
      recentMessages,
    ] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({ where: { isPublished: true, isInStock: true } }),
      this.prisma.category.count({ where: { isActive: true } }),
      this.prisma.brand.count({ where: { isActive: true } }),
      this.prisma.enquiry.count(),
      this.prisma.enquiry.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.product.count({
        where: { stockQuantity: { lte: 10 } },
      }),
      this.prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { take: 2 },
          _count: { select: { items: true } },
        },
      }),
      this.prisma.contactMessage.count({
        where: { isResolved: false },
      }),
    ]);

    const statusCounts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      FOLLOW_UP_REQUIRED: 0,
      QUOTATION_SHARED: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    enquiryStatusGroups.forEach((g) => {
      statusCounts[g.status] = g._count._all;
    });

    const conversionRate = totalEnquiries > 0
      ? Math.round((statusCounts.CONVERTED / totalEnquiries) * 100)
      : 0;

    return {
      metrics: {
        totalProducts,
        activeProducts,
        totalCategories,
        totalBrands,
        totalEnquiries,
        newEnquiries: statusCounts.NEW,
        contactedEnquiries: statusCounts.CONTACTED,
        pendingFollowUps: statusCounts.FOLLOW_UP_REQUIRED,
        quotationShared: statusCounts.QUOTATION_SHARED,
        convertedEnquiries: statusCounts.CONVERTED,
        closedEnquiries: statusCounts.CLOSED,
        lowStockProducts,
        unresolvedMessages: recentMessages,
        conversionRate,
      },
      statusBreakdown: statusCounts,
      recentEnquiries,
    };
  }
}
