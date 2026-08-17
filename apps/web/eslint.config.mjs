import { baseConfig } from "../../eslint.config.mjs";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...baseConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**"],
  },
];

export default eslintConfig;
