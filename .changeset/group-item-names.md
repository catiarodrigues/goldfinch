---
"@catiarodrigues/goldfinch": patch
---

Fix a 1.1.0 regression: items in `Checkbox.Group` and `Radio.Group` shared one label id, so screen readers announced every option with the first option's name. Each item now has its own label.
