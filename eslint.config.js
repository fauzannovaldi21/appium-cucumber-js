// ✅ ESLint Flat Config for Appium + WDIO + Cucumber (ESLint v9+)

import js from "@eslint/js";
import globals from "globals";
import * as wdio from "eslint-plugin-wdio";
import * as cucumber from "eslint-plugin-cucumber";
import prettier from "eslint-config-prettier";

export default [
  // ⛔ Ignore folders that shouldn't be linted
  {
    ignores: [
      "logs/",
      "reports/",
      "allure-report/",
      "allure-results/",
      "**/allure-report/**",
      "**/allure-results/**",
      "node_modules/",
    ],
  },

  // 🧠 Base ESLint recommended rules
  js.configs.recommended,

  // ⚙️ Custom project configuration
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        // 🧩 WDIO globals
        driver: "readonly",
        browser: "readonly",
        $: "readonly",
        $$: "readonly",

        // 🧩 Allure plugin & UI libs used in reports
        allure: "readonly",
        Backbone: "readonly",
        jQuery: "readonly",
      },
    },

    plugins: {
      wdio,
      cucumber,
    },

    rules: {
      /* 🔹 General JS Rules */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "no-undef": "off", // karena banyak global dari WDIO/Allure

      /* 🔹 WDIO Rules */
      "wdio/await-expect": "off",

      /* 🔹 Cucumber Rules */
      "cucumber/no-restricted-tags": "off",

      /* 🔹 Import Rules */
      "import/no-unresolved": "off",

      /* 🔹 Prettier Compatibility */
      ...prettier.rules,
      "indent": ["error", 2],
      "space-before-function-paren": ["error", "never"],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-infix-ops": "error",
      "comma-spacing": ["error", { "before": false, "after": true }]
    },
  },
];
