/**@type {import('next').NextConfig} */

/** @type {NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN, "cdn.builder.io", 'hucuyiuklmlwsybaajbg.supabase.co'],
    dangerouslyAllowSVG: true,   // Enable SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};

export default nextConfig;
