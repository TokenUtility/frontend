/** @type {import('next').NextConfig} */
const path = require("path");
require('./envConfig.js')

const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUBGRAPH_URL_MAINNET: process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET,
    NEXT_PUBLIC_API_URL_MAINNET: process.env.NEXT_PUBLIC_API_URL_MAINNET,
    NEXT_PUBLIC_API_URL_DEVNET: process.env.NEXT_PUBLIC_API_URL_DEVNET,
    NEXT_PUBLIC_API_URL_TESTNET: process.env.NEXT_PUBLIC_API_URL_TESTNET,
    NEXT_PUBLIC_ALGOLIA_ID: process.env.NEXT_PUBLIC_ALGOLIA_ID,
    NEXT_PUBLIC_ALGOLIA_API: process.env.NEXT_PUBLIC_ALGOLIA_API,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID,
    NEXT_PUBLIC_SHOW_COMING_SOON: process.env.NEXT_PUBLIC_SHOW_COMING_SOON,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_SUPPORTED_NETWORK_ID: process.env.NEXT_PUBLIC_SUPPORTED_NETWORK_ID,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_LOCAL_ENVIRONMENT: process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT,
    PINATA_JWT: process.env.PINATA_JWT,
    NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    NEXT_PUBLIC_RPC_URL_MAINNET: process.env.NEXT_PUBLIC_RPC_URL_MAINNET,
    NEXT_PUBLIC_RPC_URL_DEVNET: process.env.NEXT_PUBLIC_RPC_URL_DEVNET,
    NEXT_PUBLIC_RPC_URL_TESTNET: process.env.NEXT_PUBLIC_RPC_URL_TESTNET,
  },
};

module.exports = nextConfig;
