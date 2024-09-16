/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',

    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true
            }
        ]
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shared.akamai.steamstatic.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
