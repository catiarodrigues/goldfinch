---
"@catiarodrigues/goldfinch": minor
---

Visual consistency and contrast pass:

- Form controls have visible edges: inputs, `Select`, `Combobox`, `InputGroup`, unchecked checkboxes and radios, and toggles that are off use a new `--color-goldfinch-control-edge` token, at least 3:1 against the page in both modes (WCAG 1.4.11). Their edges were about 1.2:1.
- Focus rings are the same everywhere: 2px in the `focus` colour. Text inputs, `Select` and `Combobox` used a faint 1.5px ring.
- `Input`, `InputArea` and `Select` fill their container, like `Combobox` and inputs in a field. Set a width with `className` to make one narrower.
- `Button` heights and text sizes match `Input` at each size, so a button lines up with the field beside it; the base size uses 16px text, up from 14px. Labels no longer wrap. `outline` now looks different from the default `secondary` button, and `destructive` has a hover state. `shape="square"` makes the button square, as documented; it used to only remove the rounded corners.
- Popups share one look: `DropdownMenu`, `Popover`, `Tooltip` and `Toast` use the same background, edge and shadow as `Select` and `Combobox`.
- Fixed `Modal` having no shadow, and `MenuBar` collapsing to its icons unless it was given a height.
