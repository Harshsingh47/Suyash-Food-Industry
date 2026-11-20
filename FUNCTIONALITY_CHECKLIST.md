# FUNCTIONALITY CHECKLIST
# SUYASH FOOD INDUSTRIES

This checklist contrasts the legacy WordPress/WooCommerce features with the modernized WhatsApp Enquiry platform requirements.

---

## 1. Feature Transition Matrix

| Feature | Legacy WordPress Status | Modern Platform Requirement | Architecture / Implementation |
|:---|:---:|:---:|:---|
| **Online Payment Gateway** | Unused / Misconfigured | **NO PAYMENT GATEWAY** | Strict business requirement: No gateway SDKs, no payment processing. |
| **Online Checkout Page** | Present (`/checkout`) | **ELIMINATED** | Prevent customer confusion and abandoned checkouts. |
| **Traditional Shopping Cart** | Present (`/cart`) | **REPLACED by "My Enquiry"** | Cart semantics replaced by Product Enquiry List. |
| **Single Product Enquiry** | Fragmented / Broken | **PRIMARY ACTION (WhatsApp)** | Opens WhatsApp with prefilled product SKU, name, pack size, quantity, and link. |
| **Multi-Product Enquiry** | None | **DEDICATED "My Enquiry"** | Persistent drawer & page aggregating multiple items into a consolidated WhatsApp enquiry. |
| **Enquiry Database Persistence**| None (untracked chat) | **MANDATORY POSTGRESQL** | Every enquiry is saved with reference code (e.g. `SFI-ENQ-1042`), contact info, items, and status. |
| **Admin Enquiry Management** | None | **DEDICATED CRM (`/admin`)** | Full enquiry pipeline: New → Contacted → Follow-up Required → Quotation Shared → Converted → Closed. |
| **Direct WhatsApp Reply** | None | **1-CLICK ADMIN ACTION** | Admin can click to open WhatsApp chat directly with customer referencing their enquiry ID. |
| **Inventory Tracking** | Basic WC Stock | **MANUAL BUSINESS INVENTORY** | Stock changes tracked through Admin adjustments with history log (no auto-deduction on enquiry). |
| **Promotions & Offers** | WC Coupons | **INFORMATIONAL OFFERS CMS** | Promotional banners & badges (e.g. "Festival Special", "Wholesale Tier") without automated checkout math. |
| **Product Search** | Slow WP SQL LIKE search | **INSTANT REAL-TIME SEARCH** | Fast debounced client-side + backend indexed search across names, tags, ingredients, and categories. |
| **Faceted Filtering** | Plugin-based page reload | **INSTANT REACT FILTERS** | Category pills, brand filters, pack size, and price range sliders with 0ms lag. |
| **Mobile Navigation** | Heavy Elementor drawer | **HIGH-PERFORMANCE DRAWER** | Native-feeling responsive drawer with quick WhatsApp link, category accordion, and enquiry badge. |
| **Admin Roles** | WP Administrator | **ROLE-BASED RBAC (NestJS)** | Super Admin and Manager roles with secure JWT authentication and bcrypt password hashing. |

---

## 2. WhatsApp Message Specification

### A. Single Product WhatsApp Message Format
```text
Hello Suyash Food Industries,

I am interested in the following product:

Product: Pure Apricot Oil
SKU: SFI-12
Size: 250 ml
Quantity: 2
Product Link: https://suyashfoodindustries.in/product/pure-apricot-oil

Please share availability, wholesale/retail pricing, and delivery timeline.

Thank you!
```

### B. Consolidated Multi-Product WhatsApp Message Format
```text
Hello Suyash Food Industries,

I would like to enquire about the following products from your catalogue:

1. Pure Wild Apricot Oil (SKU: SFI-11) — 250 ml — Qty: 2
2. Himalayan Lal Rajma (SKU: SFI-9) — 500g — Qty: 4
3. Pure Desi Ghee (SKU: SFI-18) — 500 ml — Qty: 1

Enquiry Reference: SFI-ENQ-2026-108
Name: [Customer Name]
Location: [City / State]

Please share current availability, pricing, and dispatch details.

Thank you!
```

---

## 3. Quality & Acceptance Gate

- [x] Zero payment gateway dependencies
- [x] WhatsApp numbers dynamically fetched from admin settings (default: `+919805565679`)
- [x] Real PostgreSQL schema with relational integrity
- [x] High-performance mobile responsive UI
- [x] Fully functioning `/admin` dashboard with live API integration
