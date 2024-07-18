/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
