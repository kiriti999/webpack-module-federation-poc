const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { EnvironmentPlugin } = require('webpack');

const MFE_HOST = {
  production: 'http://localhost:3001',
  development: 'http://localhost:3001',
  // ISSUE HERE: We need to use the below custom key 'dev: url' as env so that it runs localhost url
  dev: 'https://www.google.com', // assume this dev env is deployment and we got url
}

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  webpack: (config, options) => {
    const BASE_URL = MFE_HOST[process.env["APP_ENV"]];
    console.log('BASE_URL:', BASE_URL)
    console.log('process.env["NODE_ENV"]:', process.env["NODE_ENV"])
    console.log('process.env["APP_ENV"]:', process.env["APP_ENV"])
    const { isServer } = options;
    config.experiments = { topLevelAwait: true, layers: true };

    // Use EnvironmentPlugin to set environment variables
    config.plugins.push(
      new EnvironmentPlugin({
        APP_ENV: "{{APP_ENV}}",
        NODE_ENV: "{{NODE_ENV}}"
      })
    );

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
