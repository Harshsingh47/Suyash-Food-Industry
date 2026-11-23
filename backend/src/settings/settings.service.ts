import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getPublicSettings() {
    const settings = await this.prisma.setting.findMany();
    const config: Record<string, string> = {};
    settings.forEach((s) => {
      config[s.key] = s.value;
    });

    // Defaults if table empty
    if (!config.whatsapp_number) config.whatsapp_number = '+919805565679';
    if (!config.contact_phone) config.contact_phone = '+91 98055 65679';
    if (!config.contact_email) config.contact_email = 'suyashfoodindustries@gmail.com';
    if (!config.business_address) config.business_address = 'Aakanksha Building, Shop-1, Near Regional Hospital, Opposite HP Gas Office, Solan, Himachal Pradesh – 173212';
    if (!config.announcement_text) config.announcement_text = '🌿 Authentic Himalayan Produce from Solan, HP • Direct Farm Sourcing • Enquire on WhatsApp for Retail & Wholesale';

    return config;
  }

  async getAll() {
    return this.prisma.setting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async update(key: string, value: string, description?: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });
  }

  async batchUpdate(settingsMap: Record<string, string>) {
    const promises = Object.entries(settingsMap).map(([key, value]) =>
      this.prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    );
    await Promise.all(promises);
    return this.getPublicSettings();
  }
}
