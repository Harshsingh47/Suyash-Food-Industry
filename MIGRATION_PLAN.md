# WORDPRESS TO NEXT.JS & NESTJS MIGRATION PLAN
# SUYASH FOOD INDUSTRIES

This document defines the structured migration path from the legacy WordPress/WooCommerce site to the modern Next.js + NestJS + PostgreSQL platform.

---

## 1. Migration Scope & Entity Mapping

| WordPress / WooCommerce Source | Target Model (Prisma / PostgreSQL) | Migration Strategy | Notes |
|:---|:---|:---|:---|
| **Products (`/wp-json/wc/store/v1/products`)** | `Product`, `ProductImage`, `ProductVariation` | Automated JSON Seed script (`prisma/seed.ts`) | Extracted all 21 products with SKUs, prices, images, descriptions. |
| **Categories (`/wp-json/wc/store/v1/products/categories`)** | `Category` | Direct relational seeding | 7 categories preserved with slugs and hierarchical ordering. |
| **Brands / Collections** | `Brand` | Seeded as distinct entities linked to products | Saroj's Heritage, Dimple's Jar, Nilansh Gold, ND Fresh, etc. |
| **Media Library (`wp-content/uploads/`)** | Local `public/images/products` + Cloudinary | High-res originals downloaded to repository | Real product photos preserved without synthetic AI packaging. |
| **Testimonials** | `Testimonial` | Structured database entities | Extracted real testimonials (Rohit Sharma, Neha Verma, Amit Thakur). |
| **Static Pages & Legal Text** | `PageContent`, CMS modules | Next.js dynamic static pages | About Us, Privacy Policy, Contact Us. |
| **WooCommerce Orders / Transactions** | *Excluded by Design* | None | Enquiry-first model replaces payment records. |

---

## 2. Seed Data Pipeline Architecture

```text
WP REST API & Sitemaps
        │
        ▼
audit_scraper/data/processed_products.json
        │
        ▼
backend/prisma/seed.ts (TypeScript Prisma Client)
        │
        ├──▶ Upsert Categories (7 entries)
        ├──▶ Upsert Brands (5 entries)
        ├──▶ Upsert Products (21 entries with SFI-1 to SFI-21)
        ├──▶ Upsert Product Images & Variations
        ├──▶ Seed Default Admin Users (Super Admin & Manager)
        ├──▶ Seed Initial Website Settings (WhatsApp number, Address, Socials)
        └──▶ Seed Real Customer Testimonials & Hero Banners
```

---

## 3. URL Preservation & SEO Redirection Map

To maintain search rankings and avoid broken links, all existing URLs are mapped or redirected:

| Old WordPress URL | New Next.js Route | Status Code |
|:---|:---|:---:|
| `/` | `/` | 200 OK |
| `/about-us/` | `/about` | 301 Redirect / Rewrite |
| `/contact-us/` | `/contact` | 301 Redirect / Rewrite |
| `/privacy-policy/` | `/privacy-policy` | 200 OK |
| `/shop/` | `/shop` | 200 OK |
| `/product/lal-chawal/` | `/product/lal-chawal` | 200 OK (Identical slug preserved) |
| `/product/[slug]/` | `/product/[slug]` | 200 OK (All 21 slugs preserved) |
| `/product-category/[slug]/` | `/category/[slug]` | 301 Redirect / Rewrite |
| `/cart/` | `/enquiry` | 301 Redirect to Enquiry List |
| `/checkout/` | `/enquiry` | 301 Redirect to Enquiry List |
| `/my-account/` | `/admin/login` | 301 Redirect |
| `/product-grid-*` | `/shop` | 301 Permanent Redirect |

---

## 4. Verification Checkpoints

1. Zero product count discrepancies: Exactly 21 products active.
2. Zero broken image links: All assets served locally or via CDN.
3. WhatsApp click-to-chat operational with dynamic country code formatting.
4. Admin seeding verified with default credentials.
