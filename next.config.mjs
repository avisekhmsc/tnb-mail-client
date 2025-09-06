/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://147.79.67.233:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
