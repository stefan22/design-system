import { defineConfig } from "cypress";

export default defineConfig({
  // We don't call Cypress.env() from any browser-side code in this repo, so
  // there's nothing to migrate to cy.env()/Cypress.expose() -- just turn off
  // the (insecure-by-default) ability for browser code to read it at all.
  allowCypressEnv: false,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
  },
  video: false,
  screenshotOnRunFailure: false,
});
