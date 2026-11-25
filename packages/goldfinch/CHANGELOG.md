# @catiarodrigues/goldfinch

## 1.1.2

### Patch Changes

- b985521: Badge colour fills now meet WCAG AA contrast (4.5:1) with white text in light and dark mode: green, teal and orange are darker, orange now uses white text like the other colours, and no badge colour switches to a lighter, failing shade in dark mode.
- c8680c3: Dark mode contrast fixes: the destructive `Button` keeps white text readable (new `--color-goldfinch-danger-solid` fill token, 4.83:1 in both modes), and `SensitiveInput`'s Copy tab uses the brand's paired text colour instead of white, which was invisible on the near-white dark-mode brand fill.

## 1.1.1

### Patch Changes

- 3f462a4: Fix a 1.1.0 regression: items in `Checkbox.Group` and `Radio.Group` shared one label id, so screen readers announced every option with the first option's name. Each item now has its own label.
- 23f3685: Fix accessibility and stale-state bugs:
  
  - `Modal.Trigger`, `Modal.Close`, `Popover.Trigger` and `Tooltip` render as their `<Button>` child instead of nesting a button inside a button.
  - Placeholder text now meets WCAG AA contrast (4.5:1) in light and dark mode.
  - `CopyToClipboard` no longer copies a stale value when `textToCopy` changes.
  - `Sidebar` context updates when `variant`, `side`, `collapsible` and other props change.
- 61c596b: `Select` composed from `<Select.Option>` children now shows the chosen option's label in the trigger, not its raw value.
- 3f462a4: `SensitiveInput`: the eye button now shows while a value is masked and is how keyboard and screen-reader users reveal it. The masked field is no longer a `role="button"` wrapping other buttons (invalid nesting), and clicks from assistive tech, which carry no coordinates, now reveal the value instead of being ignored.
