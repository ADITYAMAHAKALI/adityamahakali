const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://widgets.sociablekit.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://widgets.sociablekit.com https://accentapi.com",
  "frame-src 'self' https://widgets.sociablekit.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['adityamahakali.in', 'www.adityamahakali.in'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;