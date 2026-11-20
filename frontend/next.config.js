/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.storage.*.neon.tech',
      },
      {
        protocol: 'https',
        hostname: 'br-bitter-hill-bdnf100y.storage.c-8.us-east-2.aws.neon.tech',
      },
      {
        protocol: 'https',
        hostname: 'suyashfoodindustries.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cart',
        destination: '/enquiry',
        permanent: true,
      },
      {
        source: '/checkout',
        destination: '/enquiry',
        permanent: true,
      },
      {
        source: '/wishlist',
        destination: '/enquiry',
        permanent: true,
      },
      {
        source: '/products-grid-4-columns',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/product-grid-3-columns',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/product-grid-2-columns',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/product-grid-full-width',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/blog-grid',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog-grid-2-columns',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/our-blog',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
