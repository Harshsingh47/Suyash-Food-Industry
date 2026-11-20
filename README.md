# Suyash Food Industries — Complete Modernization & Recreation

> **Authentic Himalayan Food Products from Solan, Himachal Pradesh**  
> Complete modernized web platform engineered with **Next.js (App Router)**, **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🏔️ 1. Project Reference & Business Model

- **Reference Website:** [https://suyashfoodindustries.in/](https://suyashfoodindustries.in/)
- **Core Business Model:** Authentic Himalayan Product Catalogue Discovery & **WhatsApp-Based Product Enquiry Platform**.
- **Important Business Rule:**
  - **NO online payment gateway, NO online checkout, and NO online payment processing** in the current scope.
  - Customers browse authentic Himalayan products, select quantities and variations, and submit an enquiry either directly via **WhatsApp Click-to-Chat** or through the **My Enquiry List** (a streamlined cart-alternative).
  - All customer enquiries are persisted in the PostgreSQL database with unique tracking reference codes (`SFI-ENQ-YYMMDD-XXXX`) and routed to the business WhatsApp number (`+91 98055 65679`) for instant sales follow-up and wholesale/retail order finalization.
  - The business team manages all products, inventory, enquiries, banners, promotions, and settings through the custom **Admin Dashboard** at `/admin`.

---

## 🛠️ 2. Technology Stack

### Frontend Application
- **Framework:** Next.js (App Router, Server & Client Components)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Himalayan Earth Palette: Forest Green `#234B35`, Deep Green `#183A2A`, Warm Cream `#F8F5EC`, Muted Gold `#B99A5B`, Charcoal `#292929`, WhatsApp Green `#25D366`)
- **Icons:** Lucide React

### Backend Service
- **Framework:** NestJS (Modular Architecture, Controllers, Services)
- **Language:** TypeScript
- **Validation:** `class-validator` & `class-transformer`
- **Security & Auth:** Passport JWT, Bcrypt password hashing, Role-Based Access Control (`SUPER_ADMIN`, `MANAGER`)
- **API Protocol:** RESTful JSON APIs

### Database & ORM
- **Database:** PostgreSQL 17 (Running on dedicated port `5433`, DB: `suyash_db`)
- **ORM:** Prisma ORM 5 with type-safe schema, migrations, relations, and seed scripts

### Assets & Media
- **Packaging Photos:** All 20 original WordPress packaging images extracted, preserved, and stored locally under `frontend/public/images/products/` with high resolution and SEO-friendly filenames.

---

## 📁 3. Project Directory Structure

```text
suyash-food-industry/
│
├── frontend/                          # Next.js (App Router) Application
│   ├── app/
│   │   ├── (public)/                  # Customer-Facing Public Routes
│   │   │   ├── page.tsx               # Homepage (Hero, Categories, Featured, Pillars)
│   │   │   ├── shop/page.tsx          # Full Catalogue (Search, Category Filters, Sort)
│   │   │   ├── category/[slug]/       # Dynamic Category Showcase
│   │   │   ├── product/[slug]/        # Product Detail Page (Variations, WhatsApp CTA)
│   │   │   ├── enquiry/page.tsx       # My Enquiry Cart-Alternative & Submission
│   │   │   ├── about/page.tsx         # Solan Heritage & Himalayan Sourcing Story
│   │   │   ├── contact/page.tsx       # Contact Coordinates & Direct Message Form
│   │   │   ├── blog/page.tsx          # Mountain Wellness & Traditional Food Articles
│   │   │   └── privacy-policy/page.tsx# Privacy & Terms of Service
│   │   ├── admin/                     # Comprehensive Admin Portal (/admin)
│   │   │   ├── login/page.tsx         # Admin Authentication Screen
│   │   │   ├── page.tsx               # Overview Dashboard (KPIs, Recent Enquiries)
│   │   │   ├── enquiries/page.tsx     # Enquiry CRM (Status Pipeline, Notes, WhatsApp)
│   │   │   ├── products/page.tsx      # Product Catalogue CRUD & Variation Manager
│   │   │   ├── categories/page.tsx    # Category CRUD & Ordering
│   │   │   ├── inventory/page.tsx     # Stock Levels, Low-Stock Filter, Audit History
│   │   │   ├── offers/page.tsx        # Promotional Offers & Discounts CMS
│   │   │   ├── banners/page.tsx       # Hero Banners & Slide Manager
│   │   │   ├── settings/page.tsx      # Website Settings (WhatsApp, Address, Ticker)
│   │   │   └── layout.tsx             # Responsive Admin Navigation Shell
│   │   ├── globals.css                # Tailwind Styles & Typography
│   │   └── layout.tsx                 # Root Layout & Context Providers
│   ├── components/
│   │   ├── layout/                    # AnnouncementBar, Header, Footer
│   │   ├── product/                   # ProductCard, QuickViewModal
│   │   └── enquiry/                   # EnquiryDrawer (Slide-over multi-item drawer)
│   ├── context/
│   │   ├── AuthContext.tsx            # Admin JWT Authentication Context
│   │   └── EnquiryContext.tsx         # Customer "My Enquiry" Context (Local Storage)
│   ├── lib/
│   │   └── api.ts                     # Central API Client & WhatsApp Link Generator
│   └── public/
│       └── images/products/           # 20 Authentic Packaging Photographs
│
├── backend/                           # NestJS Backend API Service
│   ├── src/
│   │   ├── auth/                      # JWT Auth, Bcrypt, Login, Guard, Roles
│   │   ├── products/                  # Product CRUD, Slugs, Filtering, Variations
│   │   ├── categories/                # Category CRUD & Slugs
│   │   ├── brands/                    # Brand Collections
│   │   ├── enquiries/                 # Enquiry Submission, Status Pipeline, Notes
│   │   ├── inventory/                 # Stock Management & Audit Logging
│   │   ├── offers/                    # Promotional Offers & Badges
│   │   ├── banners/                   # Homepage Banners CMS
│   │   ├── settings/                  # Public & Admin Business Configuration
│   │   ├── testimonials/              # Customer Testimonials
│   │   ├── contact/                   # Contact Messages API
│   │   ├── blogs/                     # Wellness Articles API
│   │   ├── prisma/                    # Prisma DB Service
│   │   ├── app.module.ts              # Root NestJS Module
│   │   └── main.ts                    # Bootstrap with CORS & Validation
│   ├── prisma/
│   │   ├── schema.prisma              # Database Schema (16 Models)
│   │   └── seed.ts                    # Complete Migration Seed (21 Products, Admins)
│   └── .env                           # Database URL & JWT Secret
│
├── audit_scraper/                     # Scraping & Migration Audit Utilities
│   ├── dump_wp_data.py                # WordPress API & Sitemap Scraper
│   ├── data/                          # Extracted JSON Datasets
│   └── images/                        # Downloaded Original Packaging Images
│
├── pgdata/                            # Dedicated PostgreSQL 17 Cluster Data Directory
├── DEVELOPMENT_PROGRESS.md            # Comprehensive Phase-Wise Progress Tracker
├── WEBSITE_AUDIT.md                   # Existing Website Audit Report
├── PRODUCT_CATALOGUE.md               # 21 Authentic Products Reference
├── PAGE_INVENTORY.md                  # Complete Sitemap & Route Inventory
├── FUNCTIONALITY_CHECKLIST.md         # Retained, Replaced & Removed Features
├── DESIGN_DIRECTION.md                # UI/UX Brand Guidelines & Tokens
└── MIGRATION_PLAN.md                  # Database & Media Migration Roadmap
```

---

## 📦 4. Product Catalogue (All 21 Authentic Products)

All 21 authentic products from the live WordPress website have been structured, seeded, and mapped with authentic SKUs (`SFI-1` to `SFI-21`), original packaging images, and variations:

| SKU | Product Name | Category | Weight / Variations | Base Price |
|:---|:---|:---|:---|:---|
| **SFI-1** | Lal Chawal (Red Rice) | Himalayan Organic Staples | 1 kg | ₹280 |
| **SFI-2** | Kala Chawal (Black Rice) | Himalayan Organic Staples | 1 kg | ₹320 |
| **SFI-3** | Koda Grain / Mandwa Flour | Himalayan Organic Staples | 1 kg | ₹160 |
| **SFI-4** | Ogla Flour (Tartary Buckwheat) | Himalayan Organic Staples | 1 kg | ₹240 |
| **SFI-5** | Kafra Flour (Common Buckwheat) | Himalayan Organic Staples | 1 kg | ₹210 |
| **SFI-6** | Kala Matar (Himalayan Black Peas) | Himalayan Organic Staples | 1 kg | ₹180 |
| **SFI-7** | Himalayan Lal Rajma | Himalayan Organic Staples | 1 kg | ₹290 |
| **SFI-8** | Pure Apricot Oil (Cold-Pressed) | Apricot Oils | 100ml, 200ml, 500ml | ₹399 |
| **SFI-9** | Wild Apricot Oil (Chuli Oil) | Apricot Oils | 100ml, 200ml, 500ml | ₹499 |
| **SFI-10** | Nilansh Gold Protein Mix | Nilansh Gold | 500g | ₹380 |
| **SFI-11** | Nilansh Gold Kala Jira | Nilansh Gold | 100g, 250g | ₹320 |
| **SFI-12** | Pure Desi Ghee (Bilona Method) | Saroj's Heritage | 500ml, 1 Litre | ₹850 |
| **SFI-13** | Pure Sattu (Roasted Gram Flour) | Wellness & Superfood Range | 500g, 1 kg | ₹140 |
| **SFI-14** | Dehydrated Garlic Powder | Dried Gourmet & Flakes | 100g, 250g | ₹150 |
| **SFI-15** | Pure Turmeric Powder | Himalayan Organic Staples | 250g, 500g | ₹130 |
| **SFI-16** | Garlic Paste | Dimple's Jar | 200g, 400g | ₹95 |
| **SFI-17** | Sun-Dried Apple Slices | Dried Gourmet & Flakes | 200g | ₹260 |
| **SFI-18** | Dried Mushroom Mix | Dried Gourmet & Flakes | 150g | ₹340 |
| **SFI-19** | Artisan Fruit Jam (Himalayan Plum) | Dimple's Jar | 350g | ₹210 |
| **SFI-20** | Ginger Paste | Dimple's Jar | 200g, 400g | ₹95 |
| **SFI-21** | Roasted Himalayan Flax Seeds | Wellness & Superfood Range | 250g | ₹120 |

---

## 🛡️ 5. Admin Dashboard (`/admin`)

Access the admin dashboard at `http://localhost:3000/admin`.

### Default Credentials:
- **Super Administrator:**
  - **Email:** `admin@suyashfood.in`
  - **Password:** `Admin@Suyash2026`
- **Manager:**
  - **Email:** `manager@suyashfood.in`
  - **Password:** `Manager@Suyash2026`

### Admin Capabilities:
1. **Overview Dashboard:** Live KPI cards for Total Products, Pending Enquiries, Monthly Conversions, and Low Stock Alerts; Recent Enquiries with 1-click WhatsApp quick reply.
2. **Enquiry CRM (`/admin/enquiries`):** Filter by status (`NEW`, `CONTACTED`, `IN_DISCUSSION`, `CONVERTED`, `CANCELLED`); view full customer details and product breakdown; log internal follow-up notes; update status pipeline; 1-click WhatsApp customer chat.
3. **Product Catalogue (`/admin/products`):** Full CRUD for products; edit title, Hindi name, descriptions, prices, SKUs, featured badges, stock; manage packaging images; manage multiple weight variations.
4. **Categories (`/admin/categories`):** Create, update, re-order, and delete categories and brand collections.
5. **Inventory & Stock (`/admin/inventory`):** Real-time stock tracking; filter by low stock; manual stock adjustment modal with required audit reason; complete audit log history (`InventoryHistory`).
6. **Offers & Promotions (`/admin/offers`):** Create and schedule promotional campaigns; assign discount badges and target specific categories or products; toggle active status.
7. **Hero Banners CMS (`/admin/banners`):** Manage homepage hero slides; edit titles, descriptions, CTA buttons, destination links, and image URLs; toggle active status and display ordering.
8. **Website Settings (`/admin/settings`):** Live configuration of WhatsApp business number (`+919805565679`), display phone, customer support email, Solan physical address, and top announcement bar ticker text.

---

## 🚀 6. How to Run Locally

### Prerequisites
- Node.js 18+ or 20+
- PostgreSQL 17
- Git

### 1. Start PostgreSQL
```powershell
& "C:\Program Files\PostgreSQL\17\bin\postgres.exe" -D "d:\projects\suyash food industry\pgdata" -p 5433
```

### 2. Start NestJS Backend
```powershell
cd backend
npm install
npx prisma db push
npx ts-node prisma/seed.ts   # Seeds products, categories, admins, banners, settings
npm run build
node dist/src/main.js        # Runs on http://localhost:5000/api
```

### 3. Start Next.js Frontend
```powershell
cd frontend
npm install
npm run build
npm run start                # Runs on http://localhost:3000
# Or for live hot-reload development:
npm run dev
```

---

## 📱 7. Customer Flow & WhatsApp Integration

1. Customer browses `/shop` or homepage and views products.
2. Clicking **Quick View** allows selecting package size variations (e.g. 100ml, 200ml, 500ml) and adjusting quantities.
3. Customer has two options:
   - **Direct WhatsApp Enquiry:** Clicks "Enquire on WhatsApp" on any product card or detail page. This instantly opens WhatsApp with a pre-filled, customized message including product name, SKU, package size, and quantity.
   - **Multi-Product "My Enquiry" Cart:** Clicks "Add to Enquiry". Items accumulate in the slide-over drawer with persistent local storage. On the `/enquiry` checkout-alternative page, the customer submits their name, phone, email, and location. This generates a unique reference code (`SFI-ENQ-YYMMDD-XXXX`), stores the enquiry in PostgreSQL, and launches WhatsApp with the complete consolidated list.
4. Business team receives the notification, views the enquiry in the `/admin/enquiries` CRM, and replies via WhatsApp to close the sale.

---

## 🏆 8. Project Status & Deliverables Summary

All 10 phases from the project brief are **100% completed, verified, and documented**:
- [x] **Phase 1: Existing Website Audit** (`WEBSITE_AUDIT.md`, `PRODUCT_CATALOGUE.md`, `PAGE_INVENTORY.md`, etc.)
- [x] **Phase 2: Architecture & Database Design** (PostgreSQL 17, 16 Prisma models, NestJS API modules)
- [x] **Phase 3: UI/UX Design System** (Himalayan earth palette, responsive typography, reusable components)
- [x] **Phase 4: Customer-Facing Public Website** (Homepage, Shop, Category, Product Detail, About, Contact, Blog, Privacy)
- [x] **Phase 5: WhatsApp Integration & Enquiry System** (Direct Click-to-Chat, Multi-item drawer, CRM capture)
- [x] **Phase 6: Admin Dashboard** (Overview, Enquiries CRM, Products, Categories, Inventory, Offers, Banners, Settings)
- [x] **Phase 7: Data Migration & Seed Pipeline** (All 21 products, 7 categories, 5 brands, 20 real packaging images)
- [x] **Phase 8: SEO & Performance Optimization** (Semantic HTML, OpenGraph tags, dynamic server routing)
- [x] **Phase 9: Security & End-to-End Verification** (JWT RBAC, bcrypt passwords, API validation, build tests)
- [x] **Phase 10: Production Readiness & Documentation** (`README.md`, `DEVELOPMENT_PROGRESS.md`)
