# AGENTS.md

Context for AI coding agents working in this repo. Human-facing docs are the
[README](README.md) and the docs site (`pnpm dev`) — read those for _what the components do_.
This file is _how the repo is put together_ and the stuff that's easy to accidentally undo.

## Overview

A pnpm monorepo with two packages: `@catiarodrigues/goldfinch`, a React component library
built on [Base UI](https://base-ui.com/) primitives and Tailwind CSS v4 (36 components), and
`@catiarodrigues/goldfinch-docs-astro`, an Astro docs site that consumes the library via
`workspace:*` and renders one MDX page + live demo per component. The library is published
to npm as `@catiarodrigues/goldfinch` (public scoped package) — see Publishing for what keeps
that working.

## Structure

```
goldfinch/
├── packages/
│   ├── goldfinch/                          # the component library
│   │   ├── src/
│   │   │   ├── index.ts                       # barrel export -- every public export flows through here AND package.json `exports`
│   │   │   ├── components/<name>/               # one folder per component
│   │   │   │   ├── <name>.tsx                     # implementation + GOLDFINCH_<NAME>_VARIANTS config
│   │   │   │   ├── index.ts                       # public exports for this component's subpath
│   │   │   │   └── <name>.stories.tsx              # Storybook stories -- doubles as the test suite, see Conventions
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts                          # cn() (clsx+tailwind-merge) and safeRandomId()
│   │   │   │   ├── resolve-variant.ts               # resolveVariant() -- looks up a variant key, warns + falls back in dev
│   │   │   │   ├── link-provider.tsx                 # LinkProvider/useLinkComponent -- lets consumers swap <a> for a router Link
│   │   │   │   └── portal-provider.tsx                # GoldfinchPortalProvider/usePortalContainer -- Shadow DOM / custom portal target
│   │   │   └── styles/index.css                    # Tailwind v4 @theme tokens (--color-goldfinch-*), light-dark()
│   │   ├── scripts/copy-css.mjs                  # chained after `vite build` by the `build` script; copies styles into dist/styles/
│   │   ├── vite.config.ts                       # one lib entry per component + vite-plugin-dts (see Publishing) + Storybook/vitest browser test config
│   │   ├── README.md / LICENSE                  # package-local copies -- npm packs only from this directory, not the monorepo root, see Publishing
│   │   └── package.json                        # `exports` map -- one subpath per component, kept in sync with vite.config.ts entries
│   └── goldfinch-docs-astro/                 # Astro docs site, private, not published
│       └── src/
│           ├── pages/components/<name>.mdx       # one page per component, imports the library via workspace:*
│           ├── components/demos/                    # live demo components rendered inside docs pages
│           └── layouts/                            # BaseLayout -> MainLayout -> DocLayout -> MdxDocLayout
├── pnpm-workspace.yaml                       # packages/* + apps/* -- apps/ doesn't exist yet, don't assume it's populated
└── tsconfig.json                             # base tsconfig; each package has its own too
```

## Where to look

| Task | Location | Notes |
| --- | --- | --- |
| Add a new component | `packages/goldfinch/src/components/<name>/` | then wire it into 3 more places — see Anti-patterns |
| Change a component's variants (size/color/etc.) | the `GOLDFINCH_<NAME>_VARIANTS` const at the top of `<name>.tsx` | read via `resolveVariant()`, never raw object indexing |
| Add/change a design token (color, spacing) | `packages/goldfinch/src/styles/index.css` | `@theme` block, `light-dark()` per token |
| Let consumers use their router's Link component | `utils/link-provider.tsx` | `Sidebar`, `Breadcrumbs`, `Link`, `Dropdown` all consume it via `useLinkComponent()` |
| Render an overlay into a Shadow DOM / custom container | `utils/portal-provider.tsx` | `Modal`, `Toast`, `Popover`, `Tooltip`, `Dropdown`, `Select` all read `usePortalContainer()` |
| Add a docs page for a component | `packages/goldfinch-docs-astro/src/pages/components/<name>.mdx` | rendered through `MdxDocLayout` |
| Add a live interactive demo | `packages/goldfinch-docs-astro/src/components/demos/index.tsx` | one exported function per demo, imported by the `.mdx` page |

## Conventions

- Every component folder has `<name>.tsx`, `index.ts`, `<name>.stories.tsx`. A couple
  (`radio`, `text`) also have `<name>.type-spec.tsx` — not a vitest file, it's picked up by
  `tsc --noEmit` so `@ts-expect-error` assertions about generic prop types actually get
  checked in CI-equivalent (`pnpm typecheck`), not skipped.
- Variant props are read through `resolveVariant(VARIANTS, key, fallback)`, never direct
  object indexing — it warns and falls back safely in dev if an invalid string reaches the
  component. This pattern repeats in nearly every component; read
  `src/utils/resolve-variant.ts` once, fully, before touching any component's variant logic.
- Testing is Storybook stories run through `@storybook/addon-vitest` in a real Chromium via
  Playwright — there are no `*.test.ts` files. Stories without a `play` function are still
  exercised as render-smoke-tests. `pnpm exec playwright install` has to be run once locally
  before `pnpm --filter @catiarodrigues/goldfinch test` will pass.
- Compound components (`Select.Option`, `Modal.Title`, `Sidebar.MenuItem`, etc.) are matched
  at runtime by a static `displayName`, not `instanceof` or type — see
  `input-group/context.ts`'s `partitionChildren`/`detectFocusMode`, which does this
  deliberately to avoid a circular import between `context.ts` and its sibling files.
- Overlay components (`Modal`, `Popover`, `Toast`, `Tooltip`, `Dropdown`, `Select`) repeat the
  same `container` prop / `usePortalContainer()` fallback and its JSDoc block near-verbatim.
  If you change portal-targeting behavior, grep for `usePortalContainer` and update every
  call site, not just one.

## Rules

- **Never commit or push without explicit confirmation.** Stage the change and show the
  diff, then wait to be told to commit.
- **Never publish to npm or bump the version without explicit confirmation.** npm refuses to
  let anyone republish over an existing version, so a publish is as irreversible as a push —
  stage the version bump, show it, then wait to be told to run `npm publish`.
- **Adding, removing, or renaming a component touches four places**: `src/components/<name>/`,
  `src/index.ts`, `package.json`'s `exports` map, and `vite.config.ts`'s `build.lib.entry`.
  These can silently drift; grep for the component name across all four before calling the
  change done.
- **Run `pnpm --filter @catiarodrigues/goldfinch typecheck` and
  `pnpm --filter @catiarodrigues/goldfinch-docs-astro typecheck` before calling any change
  done.** Neither package has a lint script wired up — typecheck is the only automated check
  that actually runs (see Toolchain).

## Anti-patterns

| Don't | Why | Instead |
| --- | --- | --- |
| Add a component subpath to only `src/index.ts` or only `package.json`'s `exports` | the barrel and the exports map are meant to stay in lockstep; missing either breaks the barrel import or the granular `components/<name>` import respectively | update `src/index.ts`, `package.json` exports, and `vite.config.ts` lib entry together |
| Index into a `GOLDFINCH_*_VARIANTS` object directly (`VARIANTS.size[key]`) | skips the dev-mode warning and safe fallback `resolveVariant()` provides for unknown/mistyped keys | call `resolveVariant(VARIANTS.size, key, DEFAULT)` |
| Build a `pl-${n}` / `pr-${n}` Tailwind class string at runtime | Tailwind's JIT scanner only picks up literal class strings in source; a template-built class never gets CSS generated for it | keep spacing/padding values as static literal strings — see the comment in `input-group/context.ts` |
| Assume `pnpm test` at the repo root runs the library's tests | root `package.json` has no `test` script | `pnpm --filter @catiarodrigues/goldfinch test` |
| Add a new dependency for animation, ID generation, class-name merging, etc. | this repo actively prunes unused deps (see git history: an unused `motion` dependency and a hand-rolled UUID polyfill were both removed by audit) | check `cn.ts`, `resolve-variant.ts`, and installed deps first |
| Remove the `dts()` plugin from `vite.config.ts`, or narrow its `include`/`exclude` without checking | it's the only thing that generates the `.d.ts` files every path in `package.json`'s `exports` map points at — without it the package still builds and publishes, but every TypeScript consumer's import breaks | run `pnpm build` and `npm pack --dry-run` after touching it, confirm `dist/src/**/*.d.ts` still exists for every export |
| Delete `packages/goldfinch/README.md` or `LICENSE` as "duplicates" of the root files | `npm publish` packs only from `packages/goldfinch/`, not the monorepo root — removing these ships a tarball with no README or license even though the root copies still exist | keep both in sync with the root manually, they're intentionally duplicated |
| Remove `"private": true` from the root `package.json`, or remove `compilerOptions.types: ["node"]` from the `dts()` call in `vite.config.ts` | root's `package.json` is literally named `"goldfinch"` (unscoped) — an unrelated package already published under that exact name. Without `private`, running `pnpm publish` from the repo root by mistake attempts to publish over it and 403s. Without the `types` override, `vite-plugin-dts`'s isolated TS program can't see `@types/node`'s ambient globals and every `process.env.NODE_ENV` dev-check errors — non-fatal (the build still completes) so it's easy to ship silently; only shows up if you read full build output, not just the tail | leave both as-is; always `cd packages/goldfinch` before publishing |

## Publishing

`packages/goldfinch/package.json` publishes to npm as a public scoped package. Three things
make that actually work correctly and are easy to silently break:

- **`publishConfig: { "access": "public" }`** — required for any `@scope/name` package with
  no paid npm org; without it `npm publish` fails outright (402).
- **`prepublishOnly: "pnpm run build"`** — forces a fresh build before every publish. Without
  it, `npm publish` ships whatever happens to be sitting in the gitignored `dist/`, which can
  be stale (this bit the repo once: a build from before an unused-dependency audit almost got
  published as current).
- **`vite-plugin-dts`** (see Structure/Anti-patterns) — generates the `.d.ts` tree under
  `dist/src/` that every subpath in `exports` and the root `types` field points at. Verify
  with `npm pack --dry-run` from `packages/goldfinch/` after any build-config change; check
  the tarball contents include `.d.ts` files, `README.md`, and `LICENSE`, not just `.mjs`.

First published 2026-08-20 as `@catiarodrigues/goldfinch@1.0.0` — it's a real, live package now,
not a dry run. Two things that aren't obvious from the config alone:

- **`pnpm config set ... --location=user` does not write to `~/.npmrc`.** It writes to pnpm's
  own token store (`~/Library/Preferences/pnpm/auth.ini` on macOS), which `npm publish` never
  reads and `pnpm publish` never shares with plain `npm`. If a token works with `npm publish`
  but `pnpm publish` 403s (or vice versa), check both files — they can silently hold different
  tokens. `npm token list` (from any directory outside this repo, to dodge `devEngines`) shows
  what a given token resolves to regardless of which file it came from.
- **The account requires 2FA for publish** (a security key, not TOTP) — a token needs the
  npmjs.com "bypass 2FA for publish" permission explicitly enabled, or every publish demands
  OTP. That prompt needs a real interactive terminal with browser access; Claude Code's `!`
  proxy doesn't provide a real TTY for it, so a publish attempted that way fails with
  `ERR_PNPM_OTP_NON_INTERACTIVE` even with a perfectly valid, correctly-scoped token. Run
  `pnpm publish` from an actual terminal app for version bumps, not through an agent's shell.

## Commands

```bash
pnpm install
pnpm dev                                                       # docs site dev server (root script filters to goldfinch-docs-astro)
pnpm build                                                      # builds the component library
pnpm build:docs                                                  # builds the docs site
pnpm typecheck                                                    # tsc --noEmit for the library only

pnpm --filter @catiarodrigues/goldfinch-docs-astro typecheck        # tsc --noEmit for the docs site (no root alias for this one)
pnpm --filter @catiarodrigues/goldfinch test                         # vitest run via Storybook addon -- needs `pnpm exec playwright install` once
pnpm --filter @catiarodrigues/goldfinch storybook                     # Storybook dev server, port 6006
pnpm --filter @catiarodrigues/goldfinch build-storybook                 # static Storybook build
```

## Toolchain

| Tool | Where | Notes |
| --- | --- | --- |
| pnpm workspaces | root `pnpm-workspace.yaml` | `packages/*` (+ `apps/*`, currently unused, no directory exists) |
| React 19 | both packages | peer dep (`>=18`) in the library, direct dep in the docs site |
| Base UI (`@base-ui/react`) | `packages/goldfinch/src/components/*` | unstyled primitives underneath most interactive components |
| Tailwind CSS v4 | both packages | `@theme` tokens in `packages/goldfinch/src/styles/index.css`, consumed via `@tailwindcss/vite` |
| Vite | `packages/goldfinch/vite.config.ts` | ESM-only lib build (`formats: ["es"]`), one entry per component |
| `vite-plugin-dts` | `packages/goldfinch/vite.config.ts` | generates the `.d.ts` tree the `exports` map depends on — see Publishing |
| Storybook 10 + `@storybook/addon-vitest` | `packages/goldfinch/.storybook/`, `*.stories.tsx` | acts as both the component catalog and the test runner — see Conventions |
| Astro 5 | `packages/goldfinch-docs-astro/` | MDX pages, `astro:transitions` (View Transitions), Shiki syntax highlighting |
| clsx + tailwind-merge | `src/utils/cn.ts` | wrapped as `cn()`, used everywhere class lists are composed |
| `@phosphor-icons/react` | both packages | the only icon set used |
| oxlint / prettier | root devDependencies | neither has an npm script anywhere in the repo — see Notes |

## Notes

- **No lint or format command currently exists.** `oxlint` and `prettier` +
  `prettier-plugin-tailwindcss` are installed as root devDependencies but neither is wired to
  a script in any `package.json`. `.vscode/settings.json` sets `oxc.oxc-vscode` (the OXC
  extension) as the default formatter on save, not Prettier — so it's unclear whether
  Prettier is actually exercised anywhere right now. Don't assume `pnpm lint` or
  `pnpm format` exists; ask before adding one.
- The docs site consumes the library via `workspace:*`, so changes to
  `packages/goldfinch/src` are visible in `pnpm dev` immediately through Vite's dev
  resolution — no build/publish step needed while iterating.
- `dist/` (gitignored) is rebuilt by `pnpm build`; never hand-edit or commit anything under it.
- `apps/*` is declared in `pnpm-workspace.yaml` but no `apps/` directory exists yet.
- `homepage` in `packages/goldfinch/package.json` points at `goldfinch-ui.com`, the domain
  configured as `site` in the docs site's `astro.config.mjs` — there's no deploy config
  (Vercel/Netlify/Cloudflare) in the repo yet, so don't assume that domain is actually live.
- The npm publish token lives in the user-level `~/.npmrc`, never in the repo — check
  `git status`/`git diff` for anything credential-shaped before staging.
