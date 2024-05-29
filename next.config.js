/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','randomuser.me'],
    },
    target: 'serverless',
    auth: {
        // Configure auth settings
        ssr: true,
      },
}

module.exports = nextConfig
