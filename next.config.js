/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //   // serverActions: true,
    //   serverComponentsExternalPackages: ["mongoose"],
    // },
    images: { 
      remotePatterns: [ 
        // {
        //   protocol: "http",
        //   hostname: "localhost",    // Add Domains here for next/Image to work
        //   port: "3000",
        //   pathname: "/",
        // },
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.clerk.dev",
        },
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
      ],
      // typescript: {
      //   ignoreBuildErrors: true,
      // },
    },
  };
  
  module.exports = nextConfig;