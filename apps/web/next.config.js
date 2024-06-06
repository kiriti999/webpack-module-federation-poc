/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  output: "export",
  transpilePackages: ["@repo/ui"],
  webpack: (config, options) => {
    config.experiments = { topLevelAwait: true, layers: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        exposes: {
          "./homeComponent": "./src/components/frontend.tsx",
        },
        filename: "static/chunks/remoteEntry.js",
      })
    );
    return config;
  },
};
