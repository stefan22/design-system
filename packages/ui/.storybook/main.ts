import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/foundations/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Docgen only makes sense for actual component source files.
      // The plugin's own default ("**/*.tsx") is evaluated with a glob
      // matcher that skips dot-directories (e.g. .storybook) by default,
      // which is what produced the "not included in the active
      // TypeScript project" warning for preview.tsx. Scoping this to
      // src/**/*.tsx is both the actual fix and the semantically correct
      // setting, since preview.tsx/main.ts aren't components anyway.
      include: ["src/**/*.tsx"],
      exclude: ["**/*.stories.tsx"],
    },
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      "@": path.resolve(import.meta.dirname, "../src"),
    };
    return viteConfig;
  },
};

export default config;
