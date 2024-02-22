const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const MFE_HOST = {
  qa: 'https://www.google.com',
  dev: 'http://localhost:3000'
}

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
    const BASE_URL = MFE_HOST[process.env["NODE_ENV"]];
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        remotes: {
          // home: `home@http://127.0.0.1:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
          home: `home@${BASE_URL}/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`
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
