import { baseConfig, reactConfig } from "../../eslint.config.mjs";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...baseConfig,
  ...reactConfig,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["storybook-static/**", "cypress/videos/**", "cypress/screenshots/**"],
  },
];

export default eslintConfig;
