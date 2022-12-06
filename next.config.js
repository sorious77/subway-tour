/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};
