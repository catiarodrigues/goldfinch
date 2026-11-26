# Contributing to Goldfinch

Thanks for helping. This guide covers setting up the repo, how components and their tests fit together, and what a pull request needs.

## Set up

You need Node 24 and pnpm. The repo pins its pnpm version, so any pnpm you have installed downloads the right one the first time it runs here.

```bash
git clone https://github.com/catiarodrigues/goldfinch.git
cd goldfinch
pnpm install
pnpm --filter @catiarodrigues/goldfinch exec playwright install chromium
```

The last command downloads the browser the tests run in. You only need it once.

## The repo

It's a pnpm monorepo with two packages:

- `packages/goldfinch` is the component library, published to npm.
- `packages/goldfinch-docs-astro` is the [docs site](https://goldfinch.catiarodrigues.dev/). It uses the library from the workspace, so changes to a component show up in the docs straight away.

To work on a component, run the docs site or Storybook:

```bash
pnpm dev                                          # docs site
pnpm --filter @catiarodrigues/goldfinch storybook # Storybook, on port 6006
```

The words the project uses for its concepts, such as field, fieldset and field error, are defined in [GLOSSARY.md](https://github.com/catiarodrigues/goldfinch/blob/main/GLOSSARY.md). Use them in code, docs and issues.

## Components

Each component lives in its own folder, `packages/goldfinch/src/components/<name>/`, with three files:

- `<name>.tsx`, the component. Sizes and variants are defined in a `GOLDFINCH_<NAME>_VARIANTS` object at the top and read with `resolveVariant()`.
- `index.ts`, its public exports.
- `<name>.stories.tsx`, its stories, which are also its tests.

A new component also has to be registered in three more places, or one of the two import styles breaks:

1. `packages/goldfinch/src/index.ts`, the barrel export.
2. The `exports` map in `packages/goldfinch/package.json`.
3. The `build.lib.entry` list in `packages/goldfinch/vite.config.ts`.

Style with the colour tokens (`bg-goldfinch-base`, `text-goldfinch-subtle`), never raw Tailwind colours, so the component follows dark mode and theme overrides. Write Tailwind classes as whole strings: Tailwind only generates classes it finds written out in the source, so a class built at runtime, like `` `pl-${n}` ``, gets no CSS.

Document every prop with a JSDoc comment. The props tables on the docs site are generated from them.

## Tests

The tests are the Storybook stories. Each one runs in a real Chromium browser, and every story is checked in three ways:

- It has to render without errors.
- axe checks it for accessibility problems, once in light mode and once in dark mode. Any violation fails the test. Fix the problem rather than turning the rule off.
- If it has a `play` function, the interactions in it have to pass. Find elements by role and accessible name, such as `getByRole("button", { name: "Save" })`, so the test also proves the element is labelled.

```bash
pnpm test
```

## Docs

Each component has a page in `packages/goldfinch-docs-astro/src/pages/components/`. Its examples are files in `packages/goldfinch-docs-astro/src/examples/<name>/`, written as app code that imports from `@catiarodrigues/goldfinch`. The page shows each example's source and renders it, and the component's stories render the same files, so every example in the docs is also tested. Don't paste an example's code into a page by hand.

## Before you open a pull request

Run the same checks as CI:

```bash
pnpm lint
pnpm format:check   # pnpm format fixes it
pnpm typecheck
pnpm typecheck:docs
pnpm test
```

If the change is something a user of the package would notice, such as a bug fix, a new prop or a visual change, add a changeset and describe the change for them:

```bash
pnpm changeset
```

Changesets become the [changelog](https://goldfinch.catiarodrigues.dev/changelog) when a release is cut. Docs-only changes don't need one.

Releases are cut and published by the maintainer.
