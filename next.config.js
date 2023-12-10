/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nsddevil.tplinkdns.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
