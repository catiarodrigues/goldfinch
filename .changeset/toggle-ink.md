---
"@catiarodrigues/goldfinch": patch
---

- `Toggle`'s on state is now ink (black in light mode, white in dark mode), matching Checkbox and Radio, instead of a hard-coded blue.
- `Toggle.Group` gives its items the `neutral` variant unless the group or an item sets another one, so no single switch stands out in a list. Pass `variant="default"` to keep the old look.
- `transitioning` now shows on screen as well: the knob dims and pulses while a change is saving. It used to set only `aria-busy`.
- A Toggle's `description` and `error` show on their own row below the switch; they were placed beside it.
- The stylesheet defines Tailwind's `dark:` variant to follow `data-mode="dark"` on `<html>`, the same switch as the colour tokens. Before, `dark:` classes followed the operating system, so an app with its own dark mode could show light parts.
