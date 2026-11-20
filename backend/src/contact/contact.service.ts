import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async submitMessage(dto: { name: string; email: string; phone?: string; subject?: string; message: string }) {
    if (!dto.name || !dto.email || !dto.message) {
      throw new BadRequestException('Name, email, and message are required');
    }
    return this.prisma.contactMessage.create({
      data: dto,
    });
  }

  async findAllMessages(onlyUnresolved = false) {
    const where: any = {};
    if (onlyUnresolved) where.isResolved = false;
    return this.prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async resolveMessage(id: string, internalNotes?: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isResolved: true, internalNotes },
    });
  }

  async subscribeNewsletter(email: string) {
    if (!email || !email.includes('@')) {
      throw new BadRequestException('Valid email address is required');
    }
    return this.prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { isActive: true },
      create: { email: email.toLowerCase().trim() },
    });
  }

  async getSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
