import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { InventoryModule } from './inventory/inventory.module';
import { OffersModule } from './offers/offers.module';
import { BannersModule } from './banners/banners.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { BlogsModule } from './blogs/blogs.module';
import { ContactModule } from './contact/contact.module';
import { SettingsModule } from './settings/settings.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    EnquiriesModule,
    InventoryModule,
    OffersModule,
    BannersModule,
    TestimonialsModule,
    BlogsModule,
    ContactModule,
    SettingsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
