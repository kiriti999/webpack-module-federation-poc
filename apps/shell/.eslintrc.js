module.exports = {
  root: true,
  extends: ["next", "custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"]
    }
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
  },
    parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
