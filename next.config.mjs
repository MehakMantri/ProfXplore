/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['aceternity.com'],
  },
  async rewrites() {
    return [
      {
        source: '/proff',
        destination: '/proff',
      },
    ];
  },
};

export default nextConfig;