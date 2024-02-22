import sharedConfig from "tailwind-config/tailwind.config";

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}"],
  plugins: sharedConfig.plugins,
  theme: sharedConfig.theme,
  presets: sharedConfig.presets
};
