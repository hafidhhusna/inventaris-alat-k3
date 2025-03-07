/**@type {import('next').NextConfig} */

/** @type {NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  }
};

export default nextConfig;
