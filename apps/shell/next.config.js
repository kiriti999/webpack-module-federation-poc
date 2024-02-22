const { i18n } = require("./next-i18next.config.js");
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  i18n: {
    locales: ["default", "en", "fr"],
    defaultLocale: "default",
    localeDetection: false
  },
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        remotes: {
          home: `home@http://127.0.0.1:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`
        },
        exposes: {
          "./EmptyComponent": "./src/Empty.component.tsx"
        },
        filename: "static/chunks/remoteEntry.js"
      })
    );
    return config;
  }
};
