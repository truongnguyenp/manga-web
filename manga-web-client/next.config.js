/** @type {import('next').NextConfig} */
/** @type {export('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

const withLess = require("next-with-less");
module.exports = withLess({
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config;
  },
});
