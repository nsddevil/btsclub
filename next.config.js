/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nsddevil.tplinkdns.com",
      },
    ],
  },
};

module.exports = nextConfig;
