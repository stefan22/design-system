# Design System

A Turborepo-managed component design system: a shared UI library built on
shadcn/ui (new-york style) + Tailwind CSS v4, documented and tested with
Storybook 10, and consumed by a Next.js 16 demo application.

## Stack &nbsp; :rocket:

| Layer                  | Tooling                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| Monorepo               | Turborepo + npm workspaces                                             |
| Framework              | Next.js 16, React 19                                                   |
| Language               | TypeScript ~5.8                                                        |
| Styling                | Tailwind CSS v4 (`@theme`, OKLCH tokens), CSS variables for light/dark |
| Components             | shadcn/ui (new-york style), Radix primitives                           |
| Forms                  | react-hook-form + zod                                                  |
| Docs / dev environment | Storybook 10.5 (`@storybook/react-vite`), MDX for docs                 |
| Testing                | Cypress Component Testing (per-component interaction specs)            |
| Theming                | `next-themes` (class-based light/dark mode)                            |
| Lint / format          | ESLint 9 config (+ `eslint-plugin-jsx-a11y`), Prettier                 |

<br />

## Folder structure &nbsp; 🚧

```
design-system/
├── apps/
│   └── web/                 Next.js 16 + React 19 demo app consuming packages/ui
├── packages/
│   ├── ui/                  component library + Storybook + Cypress
│   │   ├── src/components/  shadcn-derived components + *.stories.tsx (CSF3)
│   │   ├── src/foundations/ MDX docs for design tokens (Colors, Typography, Spacing)
│   │   ├── .storybook/      Storybook config (Vite framework, addon-docs, addon-a11y)
│   │   ├── cypress/         Component Testing specs (Button, Dialog, Form, RadioGroup, Select, ...)
│   │   ├── cypress.config.ts   Cypress config (Vite bundler, allowCypressEnv disabled)
│   │   └── vite.config.mts     Vite dev server config Cypress bundles against (JSX + "@"/"@ui" aliases)
│   ├── tailwind-config/     shared Tailwind v4 `@theme` tokens (colors, radius, shadows)
│   └── tsconfig/            shared tsconfig bases
├── turbo.json
└── package.json              root, npm workspaces
```

<br />

## Getting started &nbsp; ☕

Requires Node 20+ and npm 10+.  
Installs and links every workspace (`apps/web`, `packages/ui`, `packages/tailwind-config`, `packages/tsconfig`) from the root.

```bash
npm install
```

### Running Demo app

Local dev env: `http://localhost:3000`.

```bash
npm run dev --workspace web
# or from apps/web:
npm run dev
```

### Running Storybook

```bash
cd packages/ui
npm run storybook          # dev server on :6006
npm run build-storybook
```

### Running tests

**Cypress Component Testing**
Specs live under `cypress/component/` and cover each primitive's key interactions (click, keyboard nav, form validation, etc.).

```bash
cd packages/ui
npm run test      # headless (cypress run --component)
npm run cy:open   # interactive runner
```

### Lint

Runs ESLint across every workspace via the Turborepo `lint` pipeline

```bash
npm run lint
```

### Build

```bash
npm run build
```

<br />

## CI/CD &nbsp; 🏗️

### Husky

- **pre-commit**: runs ESLint and Prettier on pre-commits
- **pre-push**: runs type checking and ESLint across each workspace. It gets blocked if either one fails.

### Git Actions

Runs on every Pull Requests (targeting main branch). Three separate jobs: `lint`, `check-types`, and `test` which runs Cypress  
for `packages/ui` via `cypress-io/github-action`.

<br />

## Design tokens &nbsp; ⚛️

All color, radius, shadow, and font tokens live at:
`packages/tailwind-config/src/theme.css`.  
Colors are OKLCH values exposed as CSS variables, re-themed for dark mode under a `.dark` class selector, and
mapped to Tailwind v4 utilities via `@theme`.  
Both `packages/ui` and `apps/web` import this file

<br />

## Adding a new shadcn component &nbsp; 🍩

Shadcn registry -> `https://ui.shadcn.com/r/styles/new-york-v4/`

```bash
cd packages/ui
npx shadcn@latest add <component-name>
```
