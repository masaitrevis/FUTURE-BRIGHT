/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  env: {
    // These will be overridden by .env.local or environment variables
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'bright-elite-default-secret-change-me',
  }
};

module.exports = nextConfig;
