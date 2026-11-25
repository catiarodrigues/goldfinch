# Changesets

Every PR that changes what `@catiarodrigues/goldfinch` users get adds a changeset:

```bash
pnpm changeset        # pick patch / minor / major, write a one-line summary
```

To release: `pnpm changeset version` (bumps the version and writes `CHANGELOG.md`),
commit, then publish from a real terminal (see AGENTS.md → Publishing).
