/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CDN_BASE_URL.split("/").pop()
      }
    ],
    deviceSizes: [640, 750, 1080, 1280]
  },
};

export default nextConfig;
