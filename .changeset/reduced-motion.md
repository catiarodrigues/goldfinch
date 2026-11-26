---
"@catiarodrigues/goldfinch": patch
---

Goldfinch respects the operating system's reduced-motion setting everywhere. `Modal`, `Popover`, `Tooltip`, `Toast`, `Collapsible`'s caret and `CopyToClipboard` now skip their transitions, and `SkeletonLine` and the toast bump stop animating. Before, only `Toggle` and `Sidebar` did. Also removed animation classes from `DropdownMenu` and `EmptyState` that never had any effect.
