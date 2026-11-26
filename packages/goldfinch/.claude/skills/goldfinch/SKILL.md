---
name: goldfinch
description: Use when building or editing UI in a project that has @catiarodrigues/goldfinch installed (or when asked to add it) — a React component library on Base UI + Tailwind CSS v4. Covers import conventions, compound-component APIs, router/portal setup, and theming, so components are used correctly instead of guessed at.
---

# Goldfinch

React component library on [Base UI](https://base-ui.com/) primitives + Tailwind CSS v4.
37 components, accessible by default (ARIA, keyboard nav, focus management already handled —
don't add redundant `aria-*` unless overriding real custom behavior).

## Setup

```bash
pnpm add @catiarodrigues/goldfinch
pnpm add -D tailwindcss @tailwindcss/vite
```

Only real peer deps are `react`/`react-dom` (>=18) — `@phosphor-icons/react`, `@base-ui/react`,
`clsx`, `tailwind-merge` all come along as regular dependencies, don't install them separately.

**Tailwind CSS v4 is required.** The stylesheet ships as Tailwind source (`@import "tailwindcss"`

- `@theme` tokens), not compiled CSS — the consuming project's Tailwind build generates the
  utility classes. Add `tailwindcss()` from `@tailwindcss/vite` to `vite.config.ts` plugins, then
  put this in the app's main CSS file (once):

```css
@import "@catiarodrigues/goldfinch/styles";
@source "../node_modules/@catiarodrigues/goldfinch/dist";
```

- `@source` is mandatory: Tailwind v4 doesn't scan `node_modules`, so without it every
  component renders unstyled. The path is relative to the CSS file — adjust it if the CSS file
  isn't one level below the project root.
- Don't add a second `@import "tailwindcss"`; the Goldfinch stylesheet already includes it.
- Don't import the stylesheet from TS/TSX (`import "@catiarodrigues/goldfinch/styles"`):
  `@source` can't go there, and TypeScript 6+ errors on that side-effect import.

## Imports

```tsx
// Barrel — simplest, fine for most apps
import { Button, Input, Modal } from "@catiarodrigues/goldfinch";

// Granular — tree-shakeable, one component per import
import { Button } from "@catiarodrigues/goldfinch/components/button";
```

## Compound components

Sub-parts are attached directly to the import (`Modal.Trigger`, not a separate import). This is
the #1 thing to get right — don't invent prop-based APIs for things that are actually compound
children.

| Component         | Sub-parts                                                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Modal`           | `.Root` `.Trigger` `.Title` `.Description` `.Close`                                                                                                                                                                                                    |
| `Popover`         | `.Trigger` `.Content` `.Title` `.Description` `.Close`                                                                                                                                                                                                 |
| `DropdownMenu`    | `.Trigger` `.Portal` `.Content` `.Item` `.LinkItem` `.CheckboxItem` `.RadioGroup` `.RadioItem` `.RadioItemIndicator` `.Label` `.Separator` `.Shortcut` `.Group` `.Sub` `.SubTrigger` `.SubContent`                                                     |
| `Select`          | `.Option` `.Group` `.GroupLabel` `.Separator`                                                                                                                                                                                                          |
| `Checkbox`        | `.Item` `.Group` `.Legend`                                                                                                                                                                                                                             |
| `Radio`           | `.Item` `.Group` `.Legend`                                                                                                                                                                                                                             |
| `Toggle`          | `.Item` `.Group` `.Legend`                                                                                                                                                                                                                             |
| `Input`           | `.Group` (= `InputGroup`) `.Sensitive` (= `SensitiveInput`)                                                                                                                                                                                            |
| `InputGroup`      | `.Input` `.Button` `.Addon` `.Suffix`                                                                                                                                                                                                                  |
| `Toolbar`         | `.Button` `.Input` `.InputGroup`                                                                                                                                                                                                                       |
| `Table`           | `.Header` `.Head` `.Row` `.Body` `.Cell` `.CheckCell` `.CheckHead` `.Footer` `.ResizeHandle`                                                                                                                                                           |
| `Page`            | `.Title` `.Description` `.Breadcrumbs`                                                                                                                                                                                                                 |
| `Pagination`      | `.Info` `.PageSize` `.Controls` `.Separator`                                                                                                                                                                                                           |
| `Collapsible`     | `.Root` `.Trigger` `.Panel`                                                                                                                                                                                                                            |
| `Card`            | `.Primary` `.Secondary`                                                                                                                                                                                                                                |
| `Link`            | `.ExternalIcon`                                                                                                                                                                                                                                        |
| `TopNavigation`   | `.Logo` `.Nav` `.NavItem` `.Actions`                                                                                                                                                                                                                   |
| `TableOfContents` | `.Title` `.List` `.Item` `.Group`                                                                                                                                                                                                                      |
| `Sidebar`         | `.Provider` `.Header` `.Content` `.Footer` `.Group` `.GroupLabel` `.Menu` `.MenuItem` `.MenuButton` `.MenuBadge` `.MenuSub` `.MenuSubItem` `.MenuSubButton` `.Separator` `.Trigger` `.Rail` `.Collapsible` `.CollapsibleTrigger` `.CollapsibleContent` |

### Worked examples

```tsx
// Modal — Root controls open state, content lives in the default export
<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Trigger><Button>Open</Button></Modal.Trigger>
  <Modal size="sm">
    <Modal.Title>Confirm</Modal.Title>
    <Modal.Description>Are you sure?</Modal.Description>
    <Modal.Close><Button>Close</Button></Modal.Close>
  </Modal>
</Modal.Root>

// Select — items prop auto-generates options, OR compose Select.Option by hand
<Select label="Country" items={{ us: "United States", uk: "United Kingdom" }} />
// equivalent, for custom rendering per option:
<Select label="Country">
  <Select.Option value="us">United States</Select.Option>
  <Select.Option value="uk">United Kingdom</Select.Option>
</Select>

// Checkbox.Group for a labeled set; Checkbox alone for a single checkbox
<Checkbox.Group legend="Notifications" defaultValue={["email"]}>
  <Checkbox.Item label="Email" value="email" />
  <Checkbox.Item label="SMS" value="sms" />
</Checkbox.Group>

// InputGroup merges adjacent controls into one visual unit
<InputGroup>
  <InputGroup.Input placeholder="Search…" aria-label="Search" />
  <InputGroup.Button variant="primary">Go</InputGroup.Button>
</InputGroup>

// Sidebar — Provider wraps the app shell, collapsible="none" for a static panel
<Sidebar.Provider defaultOpen>
  <Sidebar>
    <Sidebar.Header>App name</Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton href="/dashboard">Dashboard</Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Content>
  </Sidebar>
</Sidebar.Provider>
```

## Forms

Pass `label`, `description` and `error` straight to the form control (Input, InputArea,
SensitiveInput, InputGroup, Select, Combobox, Checkbox, Toggle); it adds the Field around itself only when
one of them is set. Groups (Checkbox.Group, Radio.Group, Toggle.Group) take `legend`,
`description` and `error` the same way.

```tsx
// react-hook-form: errors.x is an object, so pass its message
<Input label="Email" description="We never share it." error={errors.email?.message} />
<Radio.Group legend="Plan" error={errors.plan?.message}>…</Radio.Group>
```

Use `Combobox` instead of `Select` for long lists people would rather type to filter (countries,
time zones). It takes `items` only, as strings or `{ value, label }` objects, and `value` /
`onValueChange` use the item's `value` (`null` when cleared):

```tsx
<Combobox
  label="Country"
  items={[{ value: "pt", label: "Portugal" }]}
  value={country}
  onValueChange={setCountry}
/>
```

- **`error` is the field error.** A string is always shown and marks the field invalid
  (`aria-invalid`, plus a red ring on text fields and Select); pass `undefined` when valid. This
  is the form to use with a validation library (react-hook-form, zod, …).
- **`{ message, match: "valueMissing" }`** shows the message only when the browser's own
  validation fails that `ValidityState` check — for native `required` / `type` / `pattern`
  validation without a library.
- **Checkboxes, radios and toggles show an error by its message alone** — they get no red ring,
  by design.
- **Every control needs an accessible name:** a `label`, or `aria-label` when there's no visible
  one. Wrapping custom content in `<Field label="…">` names the control inside it.
- **Invalid styling comes from `error`.** `variant="error"` is deprecated.

## Toasts

`Toasty` (alias `ToastProvider`) wraps the subtree that needs to trigger toasts; call
`useGoldfinchToastManager()` from inside it, not from the same component that renders `Toasty`.

```tsx
function App() {
  return (
    <Toasty>
      <Page />
    </Toasty>
  );
}

function SaveButton() {
  const toast = useGoldfinchToastManager();
  return (
    <Button
      onClick={() =>
        toast.add({ title: "Saved", description: "Changes saved." })
      }
    >
      Save
    </Button>
  );
}
```

## Router integration

`Link`, `Breadcrumbs`, `Sidebar.MenuButton` and `TopNavigation.NavItem` (with `href`) render a plain `<a>` by default. To route through
React Router / Next.js `Link` / etc. instead, wrap the app in `LinkProvider` once:

```tsx
import { LinkProvider } from "@catiarodrigues/goldfinch";
import { Link as RouterLink } from "react-router-dom"; // or your router's Link

<LinkProvider component={RouterLink}>
  <App />
</LinkProvider>;
```

Don't manually swap `<a href>` for the router's Link inside individual Goldfinch usages — set
the provider once at the root instead.

## Rendering overlays into Shadow DOM / a custom container

Only needed inside a web component or when portalling outside `document.body`. `Modal`, `Toast`,
`Popover`, `Tooltip`, `Dropdown`, and `Select` all read this automatically:

```tsx
import { GoldfinchPortalProvider } from "@catiarodrigues/goldfinch";

<GoldfinchPortalProvider container={shadowRootRef}>
  <App />
</GoldfinchPortalProvider>;
```

Most apps never need this — skip it unless there's an actual Shadow DOM / custom-container
requirement.

## Theming

- Colors are CSS custom properties (`--color-goldfinch-*`) with a light value and a dark value
  (dark applies under `data-mode="dark"` on `<html>`, which Tailwind's `dark:` also follows) —
  don't hardcode hex colors when composing with Goldfinch components, use the
  same tokens (`bg-goldfinch-base`, `text-goldfinch-subtle`, `border-goldfinch-hairline`, etc.)
  so custom markup matches.
- Every component accepts `className`, merged safely via `tailwind-merge` — overriding a utility
  class (e.g. `<Button className="px-8">`) replaces the conflicting default rather than fighting
  it with `!important`.
- Size/variant props are plain strings (`size="sm"`, `variant="primary"`) — check the specific
  component's prop types for the exact allowed values rather than assuming a shared enum across
  components (sizes differ: some use `xs/sm/base/lg`, others `sm/md/lg`).

## Components

| Component       | Granular import                |
| --------------- | ------------------------------ |
| Alert           | `components/alert`             |
| Badge           | `components/badge`             |
| Breadcrumbs     | `components/breadcrumbs`       |
| Button          | `components/button`            |
| Card            | `components/card`              |
| Checkbox        | `components/checkbox`          |
| Collapsible     | `components/collapsible`       |
| Combobox        | `components/combobox`          |
| CopyToClipboard | `components/copy-to-clipboard` |
| Dropdown        | `components/dropdown`          |
| EmptyState      | `components/empty-state`       |
| Field           | `components/field`             |
| Grid            | `components/grid`              |
| Input           | `components/input`             |
| InputGroup      | `components/input-group`       |
| Label           | `components/label`             |
| Link            | `components/link`              |
| Menubar         | `components/menubar`           |
| Modal           | `components/modal`             |
| Page            | `components/page`              |
| Pagination      | `components/pagination`        |
| Popover         | `components/popover`           |
| Progress        | `components/progress`          |
| Radio           | `components/radio`             |
| Select          | `components/select`            |
| SensitiveInput  | `components/sensitive-input`   |
| Sidebar         | `components/sidebar`           |
| Spinner         | `components/spinner`           |
| Table           | `components/table`             |
| TableOfContents | `components/table-of-contents` |
| Tabs            | `components/tabs`              |
| Text            | `components/text`              |
| Toast           | `components/toast`             |
| Toggle          | `components/toggle`            |
| Toolbar         | `components/toolbar`           |
| Tooltip         | `components/tooltip`           |
| TopNavigation   | `components/top-navigation`    |

Full API reference, props tables, and live examples for every component:
**[goldfinch.catiarodrigues.dev](https://goldfinch.catiarodrigues.dev/)**
