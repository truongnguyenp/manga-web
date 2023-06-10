const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:5000'], // Add the localhost domain and port
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const withLess = require('next-with-less');
module.exports = withLess(nextConfig);
