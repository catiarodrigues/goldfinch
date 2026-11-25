---
"@catiarodrigues/goldfinch": patch
---

`SensitiveInput`: the eye button now shows while a value is masked and is how keyboard and screen-reader users reveal it. The masked field is no longer a `role="button"` wrapping other buttons (invalid nesting), and clicks from assistive tech, which carry no coordinates, now reveal the value instead of being ignored.
