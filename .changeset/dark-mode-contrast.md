---
"@catiarodrigues/goldfinch": patch
---

Dark mode contrast fixes: the destructive `Button` keeps white text readable (new `--color-goldfinch-danger-solid` fill token, 4.83:1 in both modes), and `SensitiveInput`'s Copy tab uses the brand's paired text colour instead of white, which was invisible on the near-white dark-mode brand fill.
