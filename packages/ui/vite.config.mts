import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cypress's component-testing dev server (bundler: "vite" in
// cypress.config.ts) looks for a vite.config.* at the project root and has
// no visibility into .storybook/main.ts's viteFinal setup. This file gives
// it the same JSX transform and "@"/"@ui" alias resolution Storybook and
// the rest of the toolchain already have, so components under test compile
// and resolve imports the same way they do everywhere else.
//
// This is a .mts file (real ESM, no CommonJS interop) so it stays compatible
// with Vite's upcoming `configLoader: 'native'` default -- which is also why
// we use `import.meta.dirname` here instead of the CommonJS-only `__dirname`.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@ui": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
