/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
    'promise',
    'import',
    'node',
    'eslint-plugin-vite',
  ],
  rules: {
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
    "prettier/prettier": ["error", { endOfLine: "off" }],
    "javascript.validate.enable": false,
  },
};
