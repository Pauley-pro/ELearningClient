/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','randomuser.me'],
    },
    output: 'serverless',
}

module.exports = nextConfig
