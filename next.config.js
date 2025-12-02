/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Configuração para Netlify
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

