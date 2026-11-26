---
"@catiarodrigues/goldfinch": patch
---

`Button`'s `loading` state shows a spinner, as documented: it takes the icon's place before the label. Before, `loading` only disabled the button. A loading button now blocks clicks with `aria-disabled` instead of the `disabled` attribute, so it keeps keyboard focus, and sets `aria-busy`. Also fixed `loading` together with `disabled={false}` leaving the button clickable.
