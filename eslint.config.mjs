import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  ...compat.config({
    extends: [
      "next",
      "eslint:recommended",
      "plugin:jest/recommended",
      "prettier",
    ],
    ignorePatterns: [".next", "infra/migrations"],
  }),
];

export default config;
