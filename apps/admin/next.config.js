/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@travel-agency/ui', '@travel-agency/contracts', '@travel-agency/utils'],
  images: {
    domains: ['images.pexels.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@travel-agency/database'],
  },
}

module.exports = nextConfig