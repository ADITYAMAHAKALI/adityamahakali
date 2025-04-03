/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        process.env.NODE_ENV === 'development'
          ? 'localhost:3000'
          : 'https://adityamahakali.vercel.app', // Replace with your production domain
      ],
    },
  };
  
  module.exports = nextConfig;