import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {rules: {
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "semi": [2, "always"],
    "indent": ["error", 2],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
  }},
];
