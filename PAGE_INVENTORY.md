# PAGE INVENTORY
# SUYASH FOOD INDUSTRIES

This document lists all 16 existing pages discovered on `https://suyashfoodindustries.in/`, their purpose, status, and migration action.

---

| # | Page Title | Existing URL / Slug | Current Purpose & Content | Modernization Action |
|:---:|:---|:---|:---|:---|
| 1 | **Home** | `/` (`home`) | Hero sliders, category banners, featured products, Himanchal sourcing story, apricot oil showcase, customer testimonials, blog teaser. | **RETAIN & REDESIGN:** Modern editorial Himalayan aesthetic, dynamic CMS banner integration, live PostgreSQL product feeding. |
| 2 | **About Us** | `/about-us/` | Solan Himachal Pradesh roots, company mission, 4 pillars (Authentic Sourcing, 100% Wholesome, Freshness, Sustainably Crafted), real testimonials. | **RETAIN & ENHANCE:** Rich storytelling, Himalayan origin maps, company timeline, quality certifications showcase. |
| 3 | **Shop / All Products** | `/shop/` | WooCommerce shop catalogue of 21 products. | **RETAIN & MODERNIZE:** Fast faceted filtering (category, price range, brand), instant live search, quick view modal, WhatsApp enquiry CTAs. |
| 4 | **Contact Us** | `/contact-us/` | Contact details (Solan, HP, +91 98055 65679, suyashfoodindustries@gmail.com), Contact Form 7. | **RETAIN & UPGRADE:** Direct contact form writing to PostgreSQL, interactive Google Maps embed, one-click WhatsApp chat. |
| 5 | **Privacy Policy** | `/privacy-policy/` | Formal privacy policy dated July 6, 2026 referencing brand lines (Saroj's Heritage, Dimple's Jar, Nilansh Gold). | **RETAIN & MODERNIZE:** Clean readable typography, updated legal & privacy disclosure for enquiry handling. |
| 6 | **Our Blog** | `/our-blog/` | Blog article archive. | **RETAIN & EXPAND:** Himalayan recipes, health benefits of unpolished grains, apricot oil skincare guides. |
| 7 | **Blog Grid** | `/blog-grid/` | Alternate layout of blog posts. | **CONSOLIDATE:** Merge into canonical `/blog` with responsive grid/list views. |
| 8 | **Blog Grid 2 Columns** | `/blog-grid-2-columns/` | Template variation of blog layout. | **REMOVE:** Consolidate into `/blog`. |
| 9 | **Cart** | `/cart/` | Legacy WooCommerce shopping cart. | **REPLACE:** Replace with modern slide-over / dedicated `/enquiry` ("My Enquiry List") for consolidated WhatsApp enquiry. |
| 10 | **Checkout** | `/checkout/` | Legacy WooCommerce checkout. | **REMOVE:** Incompatible with enquiry-only business model. Replaced by WhatsApp click-to-chat. |
| 11 | **My Account** | `/my-account/` | Legacy WooCommerce user dashboard. | **REPURPOSE:** Dedicated Admin portal at `/admin` for management; customer enquiry tracker at `/my-enquiries`. |
| 12 | **Wishlist** | `/wishlist/` | YITH WooCommerce wishlist. | **MERGE:** Unified with "My Enquiry" list (customers save products they want to enquire about). |
| 13 | **Products Grid 4 Columns** | `/products-grid-4-columns/` | Unused theme template page. | **REMOVE / REDIRECT:** Redirect to `/shop`. |
| 14 | **Product Grid 3 Columns** | `/product-grid-3-columns/` | Unused theme template page. | **REMOVE / REDIRECT:** Redirect to `/shop`. |
| 15 | **Product Grid 2 Columns** | `/product-grid-2-columns/` | Unused theme template page. | **REMOVE / REDIRECT:** Redirect to `/shop`. |
| 16 | **Product Grid Full Width** | `/product-grid-full-width/` | Unused theme template page. | **REMOVE / REDIRECT:** Redirect to `/shop`. |

---

### Additional Pages Created for Modern Platform
In addition to the core pages above, the modern platform will include:
1. **Category Detail Pages:**
   - `/category/apricot-oils`
   - `/category/himalayan-organic-staples`
   - `/category/wellness-superfood-range`
   - `/category/nilansh-gold`
   - `/category/dimples-jar`
   - `/category/sarojs-heritage`
   - `/category/dried-gourmet-flakes`
2. **Individual Product Detail Pages:** 21 bespoke routes under `/product/[slug]`
3. **Dedicated Enquiry Page:** `/enquiry` (Full summary of selected products for WhatsApp submission)
4. **FAQ / Help Center:** `/faq` (Ordering via WhatsApp, minimum wholesale quantities, shipping policies)
5. **Terms & Conditions:** `/terms-and-conditions`
6. **Shipping & Delivery Policy:** `/shipping-policy`
7. **Complete Admin Dashboard:** `/admin` (Overview, Products, Categories, Enquiries, Offers, Banners, CMS, Settings)
