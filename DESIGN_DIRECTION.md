# UI/UX DESIGN DIRECTION & BRAND SYSTEM
# SUYASH FOOD INDUSTRIES

## 1. Visual Brand Philosophy

Suyash Food Industries represents the pure, untamed, and sacred terrain of Solan, Himachal Pradesh. The design language must evoke:
- **Himalayan Purity:** Crisp mountain air, pristine terrace farms, sacred rivers, high-altitude orchards.
- **Artisanal Heritage:** Traditional stone-grinding (*chakki*), wooden churns (*bilona*), hand-sorted pulses, cold-pressed seed oils (*chuli*).
- **Modern Organic Elegance:** Clean, breathable editorial layouts; generous whitespace; refined serif typography; tactile photography of actual packaging.

---

## 2. Color Palette Specification

```text
┌─────────────────────────────────────────────────────────────────┐
│ Primary Brand Colors:                                           │
│  • Forest Green   #234B35  - Core branding, primary buttons     │
│  • Deep Green     #183A2A  - Dark accents, headers, footer      │
│  • Muted Gold     #B99A5B  - Badges, highlights, borders        │
├─────────────────────────────────────────────────────────────────┤
│ Background & Surface Neutrals:                                  │
│  • Warm Cream     #F8F5EC  - Page background, soft section tints│
│  • Off White      #FFFFFF  - Product cards, modal surfaces      │
│  • Natural Beige  #E8DDC9  - Subtle borders, category tiles     │
│  • Earth Slate    #292929  - High-contrast body typography      │
├─────────────────────────────────────────────────────────────────┤
│ Functional & Status Accents:                                    │
│  • WhatsApp Green #25D366  - Click-to-chat CTA buttons          │
│  • Terracotta     #C05621  - Sale badge, attention alerts       │
│  • Herbal Olive   #4A5568  - Secondary metadata & captions      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Typography Architecture

- **Primary Headings:** `Playfair Display`, `serif`
  - Evokes heritage, craftsmanship, and timeless organic luxury.
  - Used for Hero slogans, section titles, product titles, brand stories.
- **Body & Interface:** `DM Sans` / `Inter`, `sans-serif`
  - High legibility across all viewport sizes, crisp numeric tabular displays for prices, weights, and dates.
- **Accents & Vernacular Quotes:** `Noto Sans Devanagari` / `serif`
  - For Hindi cultural taglines: *“पाएँ परंपरा का स्वाद”*, *“बिना छाना हुआ”*, *“पौष्टिकता का अनमोल तोहफा”*.

---

## 4. Reusable Component Matrix

1. **Header:**
   - Top announcement strip: Solan, HP origin note, free direct WhatsApp enquiry banner.
   - Main brand row: SVG Mountain Crest Logo, primary nav links, live search bar, "My Enquiry" count badge, direct WhatsApp CTA button.
   - Category Mega-Menu: Tabbed category browser with real thumbnail photos.
2. **Product Cards:**
   - Crisp white card with subtle cream shadow (`shadow-sm hover:shadow-md transition-all`).
   - Authentic packaging photo with subtle zoom hover.
   - Category pill, SKU tag, Hindi/English title, pack size/weight.
   - Price display with regular price strike-through and savings tag.
   - Dual CTAs: Quick View, "Enquire on WhatsApp", and "Add to Enquiry".
3. **"My Enquiry" Drawer & Page:**
   - Slide-over drawer accessible anywhere with badge counter.
   - List of chosen products with item thumbnail, chosen quantity stepper, pack size.
   - "Send Complete Enquiry via WhatsApp" button generating structured multi-item message.
   - "Submit Enquiry Form" saving to PostgreSQL database.
4. **Admin Dashboard Design (`/admin`):**
   - Clean dark-sidebar navigation with Forest Green brand highlights.
   - Responsive data tables with search, sorting, status badges, action buttons.
   - Modal forms for product creation, image uploading, offer scheduling, and follow-up logging.
