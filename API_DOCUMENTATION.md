# REST API SPECIFICATION
# SUYASH FOOD INDUSTRIES (NestJS Backend)

Base URL: `http://localhost:5000/api` (or environment configured port)

All authenticated endpoints require an `Authorization: Bearer <JWT>` header.

---

## 1. Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `POST` | `/auth/login` | Public | Authenticate Super Admin or Manager. Returns `{ token, user }`. |
| `GET` | `/auth/profile` | Auth | Returns current authenticated user record with permissions. |
| `POST` | `/auth/create-user` | Super Admin | Create a new Manager account. |

---

## 2. Products (`/api/products`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/products` | Public | Paginated product list. Query params: `page`, `limit`, `category`, `brand`, `search`, `featured`, `bestSeller`, `minPrice`, `maxPrice`. |
| `GET` | `/products/:slug` | Public | Detailed product record by slug, including variations, images, category, and related products. |
| `POST` | `/products` | Admin | Create product with images and variations. |
| `PUT` | `/products/:id` | Admin | Update product details, pricing, stock, status. |
| `DELETE` | `/products/:id` | Admin | Soft delete or archive product. |

---

## 3. Categories & Brands (`/api/categories`, `/api/brands`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/categories` | Public | List all 7 active categories with product counts and images. |
| `GET` | `/categories/:slug` | Public | Category detail with associated products. |
| `POST` | `/categories` | Admin | Create category. |
| `PUT` | `/categories/:id` | Admin | Update category name, slug, image, order. |
| `DELETE` | `/categories/:id` | Admin | Delete category. |
| `GET` | `/brands` | Public | List brand collections (Saroj's Heritage, Dimple's Jar, Nilansh Gold). |
| `POST` | `/brands` | Admin | Create/edit brand collections. |

---

## 4. Enquiries & WhatsApp CRM (`/api/enquiries`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `POST` | `/enquiries` | Public | Submit single or multi-item enquiry. Generates unique reference (e.g. `SFI-ENQ-1042`), upserts customer, returns summary and pre-filled WhatsApp link. |
| `GET` | `/enquiries` | Admin | Searchable, filterable list of enquiries (by status, date, phone, name). |
| `GET` | `/enquiries/:id` | Admin | Complete enquiry detail with items, customer history, notes, and status timeline. |
| `PATCH` | `/enquiries/:id/status` | Admin | Transition enquiry status (`NEW`, `CONTACTED`, `FOLLOW_UP_REQUIRED`, `QUOTATION_SHARED`, `CONVERTED`, `CLOSED`). |
| `POST` | `/enquiries/:id/notes` | Admin | Append internal follow-up note and schedule next reminder date. |
| `GET` | `/enquiries/stats` | Admin | Real-time counts of new, pending, and converted enquiries. |

---

## 5. Inventory Management (`/api/inventory`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/inventory` | Admin | Current stock levels, SKU, out-of-stock and low-stock filters. |
| `POST` | `/inventory/adjust` | Admin | Adjust stock for a product/variation. Records reason and user ID in `InventoryHistory`. |

---

## 6. Homepage CMS & Offers (`/api/banners`, `/api/offers`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/banners` | Public | Active homepage hero slides with titles, subtitles, and CTAs. |
| `POST` | `/banners` | Admin | Create/reorder hero banners. |
| `GET` | `/offers` | Public | Active promotional banners and discount badges for products. |
| `POST` | `/offers` | Admin | Create, schedule, or toggle offers. |

---

## 7. Content & Customer Engagement (`/api/blogs`, `/api/testimonials`, `/api/contact`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/blogs` | Public | Published blog posts with pagination. |
| `GET` | `/blogs/:slug` | Public | Blog post by slug. |
| `POST` | `/blogs` | Admin | Create/update blog post with rich text and SEO fields. |
| `GET` | `/testimonials` | Public | Active customer testimonials. |
| `POST` | `/testimonials` | Admin | Add/edit testimonials. |
| `POST` | `/contact` | Public | Submit general contact message. |
| `GET` | `/contact` | Admin | View contact submissions and mark resolved. |
| `POST` | `/newsletter` | Public | Subscribe email to newsletter. |

---

## 8. Website Settings & Analytics (`/api/settings`, `/api/analytics`)

| Method | Endpoint | Access | Description |
|:---|:---|:---:|:---|
| `GET` | `/settings/public` | Public | Public configurations: WhatsApp number, contact email, phone, physical address, announcement text, social links. |
| `GET` | `/settings` | Admin | Full website settings. |
| `PUT` | `/settings` | Admin | Update settings (e.g. change WhatsApp business phone number). |
| `GET` | `/analytics/overview` | Admin | Dashboard overview metrics: total products, total enquiries, conversion rate, low stock alerts, weekly inquiry volume. |
