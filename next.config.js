/** @type {import('next').NextConfig} */
const nextConfig = {
    //     server: {
    //     domain: 'chaintify.space'
    //   },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        // domains: ['picsum.photos', 'localhost', 'server', '*'],
        remotePatterns: [{
            protocol: "https",
            hostname: "**",
        }, {
            protocol: "http",
            hostname: "**",
        }],
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig