import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      status: 'online',
      service: 'Suyash Food Industries API',
      documentation: 'NestJS REST API powered by Neon PostgreSQL',
      endpoints: {
        products: '/api/products',
        categories: '/api/categories',
        brands: '/api/brands',
        banners: '/api/banners',
        settings: '/api/settings/public',
      },
    };
  }
}
