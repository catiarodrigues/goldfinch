---
"@catiarodrigues/goldfinch": patch
---

`MenuBar`'s arrow keys (and `useMenuNavigation`) work however focus reaches the bar. They used to depend on a `focusin` event having fired first, so they could do nothing when focus was moved by script, and they listened for keys on the whole document while the bar had focus. They now listen on the bar itself and find its buttons on each key press, so options added after the first render are included.
