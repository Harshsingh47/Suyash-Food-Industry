const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { ValidationPipe } = require('@nestjs/common');
const express = require('express');

// Load from compiled dist
const { AppModule } = require('../dist/src/app.module');

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
      }),
    );

    // Root status handler
    server.get('/', (req, res) => {
      res.json({
        status: 'online',
        service: 'Suyash Food Industries Backend API',
        endpoints: {
          products: '/api/products',
          categories: '/api/categories',
          brands: '/api/brands',
          settings: '/api/settings/public',
        },
      });
    });

    await app.init();
    isInitialized = true;
  }
}

module.exports = async function handler(req, res) {
  await bootstrap();
  server(req, res);
};
