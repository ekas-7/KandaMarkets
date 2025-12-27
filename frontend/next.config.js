/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static file serving with caching
  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Allow development access from local network
  experimental: {
    allowedOrigins: ['172.20.10.8:3000'],
  },
};

module.exports = nextConfig;
