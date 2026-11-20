# PROJECT STRUCTURE
# SUYASH FOOD INDUSTRIES

The project uses a clean, separated monorepo architecture with distinct Next.js frontend and NestJS backend applications.

```text
suyash-food-industries/
│
├── frontend/                          # Next.js 15+ App Router Frontend & Admin Dashboard
│   ├── app/                           # App Router routes
│   │   ├── (public)/                  # Customer-facing public website
│   │   │   ├── page.tsx               # Homepage with hero, categories, products, story
│   │   │   ├── about/page.tsx         # About Us & Solan heritage
│   │   │   ├── shop/page.tsx          # Full product catalogue with filter drawer
│   │   │   ├── category/[slug]/       # Individual category pages
│   │   │   ├── product/[slug]/        # Individual product detail pages with WhatsApp CTAs
│   │   │   ├── enquiry/page.tsx       # Dedicated "My Enquiry" multi-product list
│   │   │   ├── contact/page.tsx       # Contact Us & Google Maps
│   │   │   ├── blog/                  # Blog listing & articles
│   │   │   └── privacy-policy/        # Legal & Privacy policy
│   │   │
│   │   ├── admin/                     # Bespoke Admin Portal
│   │   │   ├── layout.tsx             # Admin sidebar & header shell
│   │   │   ├── page.tsx               # Dashboard overview & analytics
│   │   │   ├── login/page.tsx         # Admin login
│   │   │   ├── products/              # Products CRUD, pricing, variations, images
│   │   │   ├── categories/            # Categories CRUD & display ordering
│   │   │   ├── brands/                # Brand collections CRUD
│   │   │   ├── enquiries/             # Enquiry CRM pipeline, follow-ups, direct WhatsApp
│   │   │   ├── offers/                # Informational promotional offers
│   │   │   ├── banners/               # Homepage hero banners CMS
│   │   │   ├── inventory/             # Stock adjustments & low-stock alerts
│   │   │   ├── blogs/                 # Blog post CMS
│   │   │   ├── testimonials/          # Customer reviews CMS
│   │   │   ├── messages/              # General contact submissions
│   │   │   └── settings/              # WhatsApp numbers, business info, announcement bar
│   │   │
│   │   ├── api/                       # Next.js API proxy / utility endpoints
│   │   ├── globals.css                # Tailwind CSS v4 / v3 tokens & font imports
│   │   └── layout.tsx                 # Root layout with font definitions & toast providers
│   │
│   ├── components/                    # Reusable React components
│   │   ├── ui/                        # Button, Dialog, Drawer, Input, Select, Badge, Card
│   │   ├── layout/                    # Header, Footer, AnnouncementBar, MobileNav
│   │   ├── product/                   # ProductCard, ProductGrid, ProductGallery, QuickView
│   │   ├── enquiry/                   # EnquiryDrawer, EnquiryBadge, WhatsAppEnquiryButton
│   │   ├── home/                      # HeroSection, CategoryGrid, BrandShowcase, StorySection
│   │   └── admin/                     # AdminSidebar, StatsCard, DataTable, StatusBadge
│   │
│   ├── context/                       # EnquiryContext (localStorage persistence) & AuthContext
│   ├── lib/                           # API client (Axios/fetch), WhatsApp URL builder, formatters
│   ├── public/
│   │   ├── images/products/           # 20+ authentic packaging images from WordPress
│   │   ├── images/branding/           # Logo, icons, badges
│   │   └── favicon.ico
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                           # NestJS Modular REST API Server
│   ├── src/
│   │   ├── auth/                      # JWT auth, SuperAdmin & Manager guards, bcrypt
│   │   ├── users/                     # Admin users management & RBAC
│   │   ├── products/                  # Product CRUD, filters, search, slug lookup
│   │   ├── categories/                # Category CRUD & slug lookup
│   │   ├── brands/                    # Brand collections CRUD
│   │   ├── enquiries/                 # Enquiry submission, status workflow, notes, stats
│   │   ├── offers/                    # Promotional offers & banners
│   │   ├── banners/                   # Hero & CMS banner slides
│   │   ├── inventory/                 # Stock management & audit adjustment logs
│   │   ├── customers/                 # Customer directory & enquiry history
│   │   ├── blogs/                     # Blog management & publishing
│   │   ├── testimonials/              # Customer testimonials management
│   │   ├── contact/                   # Contact messages & replies
│   │   ├── settings/                  # Global site configuration & WhatsApp settings
│   │   ├── analytics/                 # Dashboard KPI aggregation & trends
│   │   ├── prisma/                    # PrismaService & database lifecycle
│   │   ├── app.module.ts              # Root NestJS module wiring all feature modules
│   │   └── main.ts                    # Bootstrap with global validation pipe & CORS
│   │
│   ├── prisma/
│   │   ├── schema.prisma              # Master PostgreSQL schema (20+ models)
│   │   ├── migrations/                # Version-controlled SQL migrations
│   │   └── seed.ts                    # Full seed script migrating all 21 WordPress products
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                           # DATABASE_URL, JWT_SECRET, PORT
│
├── docs/                              # Project documentation & specs
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   └── API_DOCUMENTATION.md
│
├── pgdata/                            # Dedicated PostgreSQL 17 cluster (port 5433)
├── DEVELOPMENT_PROGRESS.md            # Live phase tracking
├── WEBSITE_AUDIT.md                   # Complete audit report
├── PAGE_INVENTORY.md                  # URL map
├── PRODUCT_CATALOGUE.md               # 21 verified products record
├── FUNCTIONALITY_CHECKLIST.md         # WhatsApp inquiry matrix
├── DESIGN_DIRECTION.md                # Brand tokens & styling
└── MIGRATION_PLAN.md                  # Data migration guide
```
