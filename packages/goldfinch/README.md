# Goldfinch

[![npm](https://img.shields.io/npm/v/%40catiarodrigues%2Fgoldfinch.svg)](https://www.npmjs.com/package/@catiarodrigues/goldfinch)

A React component library built on [Base UI](https://base-ui.com/) and Tailwind CSS v4. Accessible, composable, themeable components with keyboard navigation, focus management, and ARIA attributes handled out of the box.

## Features

- **36+ components** — form controls, overlays, navigation, layout, and data display
- **Accessible first** — built on Base UI with full ARIA support, keyboard navigation, and focus management
- **Tree-shakeable** — granular imports via `@catiarodrigues/goldfinch/components/<name>`
- **Themeable** — CSS custom properties via Tailwind v4, light and dark mode
- **Compound components** — declarative APIs like `Select.Option`, `Page.Title`, `Checkbox.Group`
- **Phosphor icons** — consistent icon set from `@phosphor-icons/react`

## Packages

| Package | Description |
|---|---|
| `@catiarodrigues/goldfinch` | React component library |
| `@catiarodrigues/goldfinch-docs-astro` | Documentation site (Astro) |

## Installation

Goldfinch needs **Tailwind CSS v4** in the consuming project: its stylesheet ships as Tailwind
source (theme tokens + `@import "tailwindcss"`), and your Tailwind build generates the utility
classes the components use.

```bash
pnpm add @catiarodrigues/goldfinch
pnpm add -D tailwindcss @tailwindcss/vite
```

React (`>=18`) is the only peer dependency.

### Set up the styles

Add the Tailwind plugin to Vite:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Then, in your main CSS file (e.g. `src/index.css`, imported once from `main.tsx`):

```css
@import "@catiarodrigues/goldfinch/styles";
@source "../node_modules/@catiarodrigues/goldfinch/dist";
```

- Don't add a separate `@import "tailwindcss"` — the Goldfinch stylesheet already includes it.
- `@source` is required: Tailwind v4 skips `node_modules` when scanning for class names, so
  without it the components render unstyled. The path is relative to the CSS file.
- Import the stylesheet from CSS, not from a `.ts`/`.tsx` file — `@source` only works in CSS,
  and TypeScript 6+ rejects the bare `import "@catiarodrigues/goldfinch/styles"` side-effect
  import.

## Usage

### Barrel import

```tsx
import { Button, Input, Modal } from "@catiarodrigues/goldfinch";
```

### Granular import (tree-shaking)

```tsx
import { Button } from "@catiarodrigues/goldfinch/components/button";
```

## Components

| Component | Granular path |
|---|---|
| Alert | `components/alert` |
| Badge | `components/badge` |
| Breadcrumbs | `components/breadcrumbs` |
| Button | `components/button` |
| Card | `components/card` |
| Checkbox | `components/checkbox` |
| Collapsible | `components/collapsible` |
| CopyToClipboard | `components/copy-to-clipboard` |
| Dropdown | `components/dropdown` |
| EmptyState | `components/empty-state` |
| Field | `components/field` |
| Grid | `components/grid` |
| Input | `components/input` |
| InputGroup | `components/input-group` |
| Label | `components/label` |
| Link | `components/link` |
| Menubar | `components/menubar` |
| Modal | `components/modal` |
| Page | `components/page` |
| Pagination | `components/pagination` |
| Popover | `components/popover` |
| Progress | `components/progress` |
| Radio | `components/radio` |
| Select | `components/select` |
| SensitiveInput | `components/sensitive-input` |
| Sidebar | `components/sidebar` |
| Spinner | `components/spinner` |
| Table | `components/table` |
| TableOfContents | `components/table-of-contents` |
| Tabs | `components/tabs` |
| Text | `components/text` |
| Toast | `components/toast` |
| Toggle | `components/toggle` |
| Toolbar | `components/toolbar` |
| Tooltip | `components/tooltip` |
| TopNavigation | `components/top-navigation` |

## Documentation

Full docs, props tables, and live examples: **[goldfinch.catiarodrigues.dev](https://goldfinch.catiarodrigues.dev/)**

To run the docs site locally instead:

```bash
cd packages/goldfinch-docs-astro
pnpm dev
```

## AI agent skill

The package ships a [Claude Code skill](https://code.claude.com/docs/en/skills) with import
conventions, compound-component APIs, and setup patterns, so an agent uses Goldfinch correctly
instead of guessing. After installing, copy it into your project:

```bash
mkdir -p .claude/skills
cp -r node_modules/@catiarodrigues/goldfinch/.claude/skills/goldfinch .claude/skills/goldfinch
```

## Development

```bash
pnpm install
pnpm dev                      # Start docs site
pnpm --filter @catiarodrigues/goldfinch build    # Build library
pnpm --filter @catiarodrigues/goldfinch test     # Run tests
pnpm --filter @catiarodrigues/goldfinch storybook # Storybook
```

### Creating a new component

Create a folder at `packages/goldfinch/src/components/<name>/` with:
- `<name>.tsx` — component implementation
- `index.ts` — public exports
- `<name>.stories.tsx` — Storybook stories

Add the entry to `package.json` exports, `vite.config.ts`, and `src/index.ts`.

## License

ISC
