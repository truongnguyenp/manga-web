/** @type {import('next').NextConfig} */
/** @type {export('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}


module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
};
