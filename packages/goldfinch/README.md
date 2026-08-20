# Goldfinch

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

```bash
pnpm add @catiarodrigues/goldfinch
```

### Peer Dependencies

```bash
pnpm add react react-dom @phosphor-icons/react
```

## Usage

### Barrel import

```tsx
import { Button, Input, Modal } from "@catiarodrigues/goldfinch";
import "@catiarodrigues/goldfinch/styles";
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

Browse interactive docs and live examples by running the docs site locally:

```bash
cd packages/goldfinch-docs-astro
pnpm dev
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
