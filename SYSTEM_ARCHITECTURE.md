# SYSTEM ARCHITECTURE SPECIFICATION
# SUYASH FOOD INDUSTRIES

## 1. High-Level Architecture Overview

The system is designed as a decoupled modern web application comprising a **Next.js frontend & admin portal**, a **NestJS backend service**, a **PostgreSQL relational database**, and a **WhatsApp Business Click-to-Chat integration engine**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / USER TIERS                             │
│                                                                        │
│   ┌──────────────────────────────┐    ┌────────────────────────────┐   │
│   │   Public Website Visitors    │    │    Administrators / Staff  │   │
│   │   (Desktop, Tablet, Mobile)  │    │    (/admin Dashboard)      │   │
│   └──────────────┬───────────────┘    └──────────────┬─────────────┘   │
└──────────────────┼───────────────────────────────────┼─────────────────┘
                   │                                   │
                   ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND TIER (Next.js)                         │
│                                                                        │
│   • App Router with Server Components & Client Interactivity           │
│   • Tailwind CSS Design System & Himalayan Theming Tokens              │
│   • "My Enquiry" Client State (LocalStorage + React Context)           │
│   • Dynamic WhatsApp Click-to-Chat Message Generator                   │
│   • Admin Portal UI with Role-Gated Views                              │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ HTTPS / REST (JSON)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND TIER (NestJS)                           │
│                                                                        │
│   • Modular Architecture (Auth, Products, Enquiries, Inventory, CMS)   │
│   • Authentication & RBAC Guard (JWT + Bcrypt)                         │
│   • Class-Validator Request Validation & Sanitization                  │
│   • Business Logic: Auto Ref Codes, WhatsApp URL Builders, Stock Audits│
│   • Prisma ORM Data Access Layer                                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ TCP (Port 5433 / 5432)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA TIER (PostgreSQL 17)                       │
│                                                                        │
│   • Relational Schema with Foreign Keys & Cascading Deletes            │
│   • B-Tree Indexes on Slugs, SKUs, Enquiry References, and Status      │
│   • ACID Transaction Guarantees for Enquiry & Stock Operations         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Subsystem Workflows

### A. The WhatsApp Enquiry Lifecycle
1. **Discovery:** Customer browses catalogue (`/shop`), category pages, or product details (`/product/[slug]`).
2. **Action Option A (Instant Chat):** Customer clicks *"Enquire on WhatsApp"* on any single product.
   - Formats product name, SKU, selected pack size, and URL.
   - Opens official WhatsApp API URL (`https://wa.me/<configured_number>?text=...`).
3. **Action Option B (Multi-Product Enquiry):** Customer clicks *"Add to Enquiry"* on multiple products.
   - Items accumulate in the persistent "My Enquiry" drawer.
   - From `/enquiry`, the customer can either submit a consolidated WhatsApp message OR submit an enquiry form.
   - Submitting the form saves the enquiry record into PostgreSQL, generates a unique reference number (e.g., `SFI-ENQ-2026-1042`), and displays a button to continue the conversation in WhatsApp with this reference code pre-filled.
4. **CRM Fulfillment:** Admin views enquiry in `/admin/enquiries`, inspects customer details, clicks direct WhatsApp chat button to reply, updates status (`Contacted` → `Quotation Shared` → `Converted`), and logs internal notes.

### B. Security & Role-Based Access Control (RBAC)
- **Super Admin:** Complete access to manage products, categories, pricing, stock, enquiries, users, and business settings (including changing the business WhatsApp number).
- **Manager:** Access to view/edit products, update stock, view and update enquiries, and manage customer communications.
- **Passwords:** Hashed with `bcryptjs` (salt rounds: 10).
- **Tokens:** Signed JWT with expiration, verified via NestJS `AuthGuard`.

---

## 3. Technology Stack Reference

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide React icons.
- **Backend:** NestJS 10/11, TypeScript, Prisma ORM 5/6, PostgreSQL 17, JWT, Class-Validator.
- **Media:** Next.js Image Optimization + Cloudinary SDK ready.
- **Communications:** WhatsApp Click-to-Chat (wa.me) specification.
