module.exports = {
  parser: "vue-eslint-parser", // Specifies the ESLint parser
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    // add more generic rulesets here, such as:
    // "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "prettier/vue",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
