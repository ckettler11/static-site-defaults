const { withKeystone } = require("@keystone-6/core/next");
/** @type {import('next').NextConfig} */

const nextConfig = withKeystone({
  reactStrictMode: true,
  webpack: function (config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "react-dom/client": "react-dom",
      }
    }
    return config
  },
  images: {
    domains: ['bulma.io'],
  },
});

module.exports = nextConfig
