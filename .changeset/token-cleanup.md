---
"@catiarodrigues/goldfinch": patch
---

The stylesheet defines each colour token once per mode, a light value in `@theme` and a dark value under `[data-mode="dark"]`, instead of three times. Every token resolves to the same colour as before. Every token is still available as a CSS variable, including ones no utility uses.

Removed three tokens that nothing used: `--color-goldfinch-fill-hover`, `--color-goldfinch-component` and `--color-goldfinch-binding`. If your own CSS referenced one, use the value it had: `#d9d9d9` (dark `#444444`) for `fill-hover`, and `#000000` (dark `#ffffff`) for the other two.
