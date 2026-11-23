/**
 * Technical SEO & Structured Data (JSON-LD) Utility
 * Suyash Food Industries
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://suyashfoodindustries.in';

export const BUSINESS_INFO = {
  name: 'Suyash Food Industries',
  legalName: 'Suyash Food Industries (operating as Suyash Organics)',
  telephone: '+91-98055-65679',
  email: 'suyashfoodindustries@gmail.com',
  address: {
    streetAddress: 'Solan Industrial Area & Farm Clusters',
    addressLocality: 'Solan',
    addressRegion: 'Himachal Pradesh',
    postalCode: '173212',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 30.9084,
    longitude: 77.0999,
  },
  priceRange: '₹₹',
  openingHours: 'Mo-Sa 09:00-19:00',
  brandLogo: `${SITE_URL}/images/logo.png`,
};

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * 1. Organization Schema
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS_INFO.brandLogo,
      caption: 'Suyash Food Industries Logo',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.telephone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    sameAs: [
      'https://wa.me/919805565679',
      'https://www.instagram.com/suyashfoodindustries',
    ],
  };
}

/**
 * 2. WebSite Schema with SearchAction
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Suyash Food Industries',
    description:
      'Pure, authentic Himalayan produce, wild apricot oil, and Vedic bilona cow ghee directly from Solan, Himachal Pradesh.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 3. LocalBusiness Schema
 */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    image: `${SITE_URL}/images/wholesale-showcase-b2b.webp`,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    url: SITE_URL,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };
}

/**
 * 4. BreadcrumbList Schema
 */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * 5. Product Schema (Valid Rich Snippet JSON-LD)
 */
export function buildProductSchema(product: any) {
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const images = product.images && product.images.length > 0
    ? product.images.map((img: any) =>
        img.url.startsWith('http') ? img.url : `${SITE_URL}${img.url.startsWith('/') ? img.url : `/${img.url}`}`
      )
    : [`${SITE_URL}/images/products/lal-chawal-suyash-food-industries.jpeg`];

  const price = product.salePrice && product.salePrice < product.regularPrice
    ? product.salePrice
    : product.regularPrice;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    description:
      product.shortDescription ||
      product.description?.slice(0, 300) ||
      `Buy authentic Himalayan ${product.name} from Suyash Food Industries, Solan, Himachal Pradesh.`,
    image: images,
    sku: product.sku || product.slug,
    mpn: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: product.brand?.name || 'Suyash Food Industries',
    },
    category: product.category?.name || 'Himalayan Organic Produce',
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.isInStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Suyash Food Industries',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 2,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
    },
  };
}

/**
 * 6. Article Schema
 */
export function buildArticleSchema(article: any) {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const image = article.image || article.featuredImage || `${SITE_URL}/images/wholesale-showcase-b2b.webp`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt || article.description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`,
    author: {
      '@type': 'Person',
      name: article.author || 'Saroj Sharma',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Suyash Food Industries',
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.brandLogo,
      },
    },
    datePublished: article.date || article.publishedAt || '2026-08-14',
    dateModified: article.updatedAt || article.date || '2026-11-23',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };
}
