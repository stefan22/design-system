# Design System

A Turborepo-managed component design system: a shared UI library built on
shadcn/ui (new-york style) + Tailwind CSS v4, documented and tested with
Storybook 10, and consumed by a Next.js 16 demo application.

## Stack :rocket:

| Layer | Tooling                                                                                                                                                  |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Monorepo | Turborepo + npm workspaces                                                                                                                               |
| Framework | Next.js 16, React 19                                                                                                                                     |
| Language | TypeScript ~5.8                                                                                                                                          |
| Styling | Tailwind CSS v4 (`@theme`, OKLCH tokens), CSS variables for light/dark                                                                                   |
| Components | shadcn/ui (new-york style), Radix primitives, `class-variance-authority`                                                                                 |
| Forms | react-hook-form + zod                                                                                                                                    |
| Docs / dev environment | Storybook 10.5 (`@storybook/react-vite`), MDX for docs                                                                                                   |
| Testing | Storybook's native Vitest addon (stories + play functions run as real-browser tests via Playwright), Cypress Component Testing for targeted interaction specs |
| Theming | `next-themes` (class-based light/dark mode)                                                                                                              |
| Lint / format | ESLint 9 config (+ `eslint-plugin-jsx-a11y`), Prettier                                                                                                   |

## Folder structure

```
design-system/
├── apps/
│   └── web/                 Next.js 16 + React 19 demo app consuming packages/ui
├── packages/
│   ├── ui/                  component library + Storybook + Cypress CT
│   │   ├── src/components/  shadcn-derived components + *.stories.tsx (CSF3)
│   │   ├── src/foundations/ MDX docs for design tokens (Colors, Typography, Spacing)
│   │   ├── .storybook/      Storybook config (Vite framework, addon-docs, addon-a11y)
│   │   ├── cypress/         Component Testing specs (Dialog, Select, Form)
│   │   └── vitest.config.ts Storybook Vitest addon wiring
│   ├── tailwind-config/     shared Tailwind v4 `@theme` tokens (colors, radius, shadows)
│   └── tsconfig/            shared tsconfig bases
├── turbo.json
└── package.json              root, npm workspaces
```

## Getting started

Requires Node 20+ and npm 10+.

```bash
npm install
```

This installs and links every workspace (`apps/web`, `packages/ui`,
`packages/tailwind-config`, `packages/tsconfig`) from the root.

### Run the demo app

```bash
npm run dev --workspace web
# or from apps/web:
npm run dev
```

Local dev env: `http://localhost:3000`. 

### Run Storybook

```bash
cd packages/ui
npm run storybook          # dev server on :6006
npm run build-storybook    
```


### Run tests

**Storybook + Vitest** 

```bash
cd packages/ui
npm run test         
npm run test:watch   
```


**Cypress Component Testing** 

```bash
cd packages/ui
npm run cy:run    # headless
npm run cy:open   
```

### Lint

```bash
npm run lint
```

Runs ESLint across every workspace via the Turborepo `lint` pipeline, using
the shared flat config at the repo root (`eslint.config.mjs`) plus
`eslint-plugin-jsx-a11y`. 

### Build

```bash
npm run build
```


## Design tokens

All color, radius, shadow, and font tokens live in a single place:
`packages/tailwind-config/src/theme.css`. Colors are OKLCH values exposed as
CSS variables, re-themed for dark mode under a `.dark` class selector, and
mapped to Tailwind v4 utilities via `@theme`. Both `packages/ui` and
`apps/web` import this file

## Adding a new shadcn component

 Shadcn registry -> `https://ui.shadcn.com/r/styles/new-york-v4/`

```bash
cd packages/ui
npx shadcn@latest add <component-name>
```

