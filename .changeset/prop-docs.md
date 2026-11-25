---
"@catiarodrigues/goldfinch": patch
---

Every component prop now has a JSDoc description, shown in your editor's hints. `Toasty`'s `variant` prop is deprecated: it never had an effect, because variants are set per toast with `toast.add({ variant })`.
