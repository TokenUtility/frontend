/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;