---
"@catiarodrigues/goldfinch": patch
---

Fix accessibility and stale-state bugs:

- `Modal.Trigger`, `Modal.Close`, `Popover.Trigger` and `Tooltip` render as their `<Button>` child instead of nesting a button inside a button.
- Placeholder text now meets WCAG AA contrast (4.5:1) in light and dark mode.
- `CopyToClipboard` no longer copies a stale value when `textToCopy` changes.
- `Sidebar` context updates when `variant`, `side`, `collapsible` and other props change.
