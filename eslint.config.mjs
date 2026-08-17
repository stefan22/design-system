import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

/**
 * Shared ignores + JS/TS recommended rules for the whole monorepo.
 * Every workspace should start from this.
 */
export const baseConfig = tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/cypress/videos/**",
      "**/cypress/screenshots/**",
      "**/cypress/downloads/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);

/**
 * React + jsx-a11y additions for workspaces that don't already get them
 * from a framework preset (e.g. packages/ui, which isn't a Next.js app).
 * apps/web pulls its own copies of these in via eslint-config-next, so it
 * uses `baseConfig` directly instead of this to avoid duplicate plugin
 * registration errors.
 */
export const reactConfig = tseslint.config({
  files: ["**/*.{js,jsx,ts,tsx}"],
  plugins: {
    react,
    "react-hooks": reactHooks,
    "jsx-a11y": jsxA11y,
  },
  rules: {
    ...react.configs.flat.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.flatConfigs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: { version: "detect" },
  },
});

export default baseConfig;
