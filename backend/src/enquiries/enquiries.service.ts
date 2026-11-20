import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnquiryStatus } from '@prisma/client';

export interface CreateEnquiryDto {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCity?: string;
  customerMessage?: string;
  items: Array<{
    productId: string;
    variationId?: string;
    productName: string;
    variationName?: string;
    quantity: number;
    unitPrice?: number;
  }>;
}

@Injectable()
export class EnquiriesService {
  constructor(private prisma: PrismaService) {}

  private generateReference(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    return `SFI-ENQ-${dateStr}-${random}`;
  }

  async create(dto: CreateEnquiryDto) {
    if (!dto.customerName || !dto.customerPhone) {
      throw new BadRequestException('Customer name and phone number are required');
    }

    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('At least one product must be selected for enquiry');
    }

    const referenceNumber = this.generateReference();

    // Upsert Customer
    let customer = await this.prisma.customer.findUnique({
      where: { phone: dto.customerPhone.trim() },
    });

    if (customer) {
      customer = await this.prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: dto.customerName.trim(),
          email: dto.customerEmail || customer.email,
          city: dto.customerCity || customer.city,
        },
      });
    } else {
      customer = await this.prisma.customer.create({
        data: {
          name: dto.customerName.trim(),
          phone: dto.customerPhone.trim(),
          email: dto.customerEmail?.trim(),
          city: dto.customerCity?.trim(),
        },
      });
    }

    // Save Enquiry & Items
    const enquiry = await this.prisma.enquiry.create({
      data: {
        referenceNumber,
        customerId: customer.id,
        customerName: dto.customerName.trim(),
        customerPhone: dto.customerPhone.trim(),
        customerEmail: dto.customerEmail?.trim(),
        customerCity: dto.customerCity?.trim(),
        customerMessage: dto.customerMessage?.trim(),
        status: EnquiryStatus.NEW,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            variationId: item.variationId,
            productName: item.productName,
            variationName: item.variationName,
            quantity: Number(item.quantity) || 1,
            unitPrice: item.unitPrice ? Number(item.unitPrice) : null,
            totalPrice: item.unitPrice ? Number(item.unitPrice) * (Number(item.quantity) || 1) : null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Fetch configured business WhatsApp number
    const whatsappSetting = await this.prisma.setting.findUnique({
      where: { key: 'whatsapp_number' },
    });
    const businessWhatsApp = (whatsappSetting?.value || '919805565679').replace(/[^0-9]/g, '');

    // Generate formatted WhatsApp message text
    let waMessage = `Hello Suyash Food Industries,\n\nI have placed an enquiry on your website.\n*Enquiry Ref:* ${referenceNumber}\n*Name:* ${dto.customerName}\n*Phone:* ${dto.customerPhone}\n`;
    if (dto.customerCity) waMessage += `*Location:* ${dto.customerCity}\n`;
    waMessage += `\n*Products Requested:*\n`;

    dto.items.forEach((item, idx) => {
      waMessage += `${idx + 1}. *${item.productName}*`;
      if (item.variationName) waMessage += ` (${item.variationName})`;
      waMessage += ` — Qty: *${item.quantity}*\n`;
    });

    if (dto.customerMessage) {
      waMessage += `\n*Note:* ${dto.customerMessage}\n`;
    }

    waMessage += `\nPlease share current availability, wholesale/retail pricing, and delivery timeline.\nThank you!`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodedMessage}`;

    return {
      enquiry,
      whatsappUrl,
      whatsappMessage: waMessage,
    };
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    status?: EnquiryStatus;
    search?: string;
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { referenceNumber: { contains: query.search, mode: 'insensitive' } },
        { customerName: { contains: query.search, mode: 'insensitive' } },
        { customerPhone: { contains: query.search, mode: 'insensitive' } },
        { customerCity: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [enquiries, total] = await Promise.all([
      this.prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          _count: { select: { items: true } },
        },
      }),
      this.prisma.enquiry.count({ where }),
    ]);

    return {
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const enquiry = await this.prisma.enquiry.findFirst({
      where: {
        OR: [{ id }, { referenceNumber: id }],
      },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: { id: true, name: true, sku: true, images: { take: 1 } },
            },
          },
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          include: { changedBy: { select: { id: true, name: true, role: true } } },
        },
        followUpNotes: {
          orderBy: { createdAt: 'desc' },
          include: { createdBy: { select: { id: true, name: true } } },
        },
      },
    });

    if (!enquiry) throw new NotFoundException('Enquiry not found');
    return enquiry;
  }

  async updateStatus(id: string, newStatus: EnquiryStatus, comment?: string, userId?: string) {
    const enquiry = await this.prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) throw new NotFoundException('Enquiry not found');

    const previousStatus = enquiry.status;

    const updated = await this.prisma.enquiry.update({
      where: { id },
      data: { status: newStatus },
    });

    if (userId) {
      await this.prisma.enquiryStatusHistory.create({
        data: {
          enquiryId: id,
          previousStatus,
          newStatus,
          changedByUserId: userId,
          comment: comment || `Status updated from ${previousStatus} to ${newStatus}`,
        },
      });

      await this.prisma.adminActivityLog.create({
        data: {
          userId,
          action: 'ENQUIRY_STATUS_CHANGE',
          entityType: 'Enquiry',
          entityId: id,
          details: `Enquiry ${enquiry.referenceNumber} status changed to ${newStatus}`,
        },
      });
    }

    return updated;
  }

  async addNote(id: string, note: string, followUpDate?: string, userId?: string) {
    const enquiry = await this.prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) throw new NotFoundException('Enquiry not found');

    const createdNote = await this.prisma.enquiryFollowUpNote.create({
      data: {
        enquiryId: id,
        note,
        createdByUserId: userId || (await this.prisma.user.findFirst())!.id,
      },
    });

    if (followUpDate) {
      await this.prisma.enquiry.update({
        where: { id },
        data: { followUpDate: new Date(followUpDate) },
      });
    }

    return createdNote;
  }

  async getStats() {
    const [total, byStatus] = await Promise.all([
      this.prisma.enquiry.count(),
      this.prisma.enquiry.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
    ]);

    const counts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      FOLLOW_UP_REQUIRED: 0,
      QUOTATION_SHARED: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    byStatus.forEach((item) => {
      counts[item.status] = item._count._all;
    });

    return {
      total,
      counts,
    };
  }
}
