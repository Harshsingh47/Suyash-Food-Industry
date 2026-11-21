import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    const acceptsHtml = req.headers.accept?.includes('text/html');

    if (acceptsHtml) {
      return res.type('text/html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Suyash Food Industries — Backend API</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0F2D1E; color: #F7F5EE; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
            .card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(212, 163, 89, 0.3); border-radius: 24px; padding: 40px; max-width: 560px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
            .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(37, 211, 102, 0.15); color: #25D366; font-size: 13px; font-weight: 600; padding: 6px 16px; border-radius: 9999px; margin-bottom: 24px; border: 1px solid rgba(37, 211, 102, 0.3); }
            .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #25D366; box-shadow: 0 0 10px #25D366; }
            h1 { font-size: 26px; color: #D4A359; font-weight: 700; margin-bottom: 8px; font-family: Georgia, serif; }
            .tagline { color: rgba(247, 245, 238, 0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; font-weight: 500; }
            p { color: rgba(247, 245, 238, 0.85); font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
            .links { display: flex; flex-direction: column; gap: 10px; text-align: left; }
            .link-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.08); padding: 14px 18px; border-radius: 12px; color: #F7F5EE; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.05); }
            .link-item:hover { background: rgba(212, 163, 89, 0.15); border-color: rgba(212, 163, 89, 0.4); transform: translateY(-1px); color: #FFF; }
            .method { font-size: 11px; font-weight: 700; color: #D4A359; background: rgba(212, 163, 89, 0.15); padding: 4px 8px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">
              <span class="badge-dot"></span>
              Backend API is Online & Healthy
            </div>
            <h1>SUYASH FOOD INDUSTRIES</h1>
            <div class="tagline">Solan, Himachal Pradesh</div>
            <p>Production REST API running on Vercel Serverless connected to Neon PostgreSQL.</p>
            <div class="links">
              <a href="/api/products" class="link-item">
                <span>All Products (21 Items)</span>
                <span class="method">GET /api/products</span>
              </a>
              <a href="/api/categories" class="link-item">
                <span>Himalayan Categories</span>
                <span class="method">GET /api/categories</span>
              </a>
              <a href="/api/banners" class="link-item">
                <span>Hero Banners</span>
                <span class="method">GET /api/banners</span>
              </a>
              <a href="/api/settings/public" class="link-item">
                <span>Website Settings</span>
                <span class="method">GET /api/settings/public</span>
              </a>
            </div>
          </div>
        </body>
        </html>
      `);
    }

    return res.json({
      status: 'online',
      service: 'Suyash Food Industries API',
      database: 'Neon PostgreSQL (Connected)',
      endpoints: {
        products: '/api/products',
        categories: '/api/categories',
        brands: '/api/brands',
        banners: '/api/banners',
        settings: '/api/settings/public',
      },
    });
  }
}
