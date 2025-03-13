/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
};

export default nextConfig;
