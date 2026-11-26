# @catiarodrigues/goldfinch

## 1.1.5

### Patch Changes

- 62eca50: `MenuBar`'s arrow keys (and `useMenuNavigation`) work however focus reaches the bar. They used to depend on a `focusin` event having fired first, so they could do nothing when focus was moved by script, and they listened for keys on the whole document while the bar had focus. They now listen on the bar itself and find its buttons on each key press, so options added after the first render are included.
  
  `MenuBar` is now a single Tab stop, like a toolbar: Tab moves into the bar and out again in one step, and the arrow keys move between its buttons. Tab lands on the active option first, then on the button used last. Before, every button was its own Tab stop.
- 86050ae: Goldfinch respects the operating system's reduced-motion setting everywhere. `Modal`, `Popover`, `Tooltip`, `Toast`, `Collapsible`'s caret and `CopyToClipboard` now skip their transitions, and `SkeletonLine` and the toast bump stop animating. Before, only `Toggle` and `Sidebar` did. Also removed animation classes from `DropdownMenu` and `EmptyState` that never had any effect.

## 1.1.4

### Patch Changes

- 311047c: `EmptyState`'s copy-command icon is easier to see: it uses the secondary text colour (5.5:1 in light mode, 5:1 in dark) instead of the disabled grey, which was 1.8:1, under the 3:1 WCAG asks of icons in a control.
- 41e6e64: The stylesheet defines each colour token once per mode, a light value in `@theme` and a dark value under `[data-mode="dark"]`, instead of three times. Every token resolves to the same colour as before. Every token is still available as a CSS variable, including ones no utility uses.
  
  Removed three tokens that nothing used: `--color-goldfinch-fill-hover`, `--color-goldfinch-component` and `--color-goldfinch-binding`. If your own CSS referenced one, use the value it had: `#d9d9d9` (dark `#444444`) for `fill-hover`, and `#000000` (dark `#ffffff`) for the other two.

## 1.1.3

### Patch Changes

- ac3f9f4: Every component prop now has a JSDoc description, shown in your editor's hints. `Toasty`'s `variant` prop is deprecated: it never had an effect, because variants are set per toast with `toast.add({ variant })`.
- 766b32f: Toggle changes:

  - `Toggle`'s on state is now ink (black in light mode, white in dark mode), matching Checkbox and Radio, instead of a hard-coded blue.
  - `Toggle.Group` gives its items the `neutral` variant unless the group or an item sets another one, so no single switch stands out in a list. Pass `variant="default"` to keep the old look.
  - `transitioning` now shows on screen as well: the knob dims and pulses while a change is saving. It used to set only `aria-busy`.
  - A Toggle's `description` and `error` show on their own row below the switch; they were placed beside it.
  - The stylesheet defines Tailwind's `dark:` variant to follow `data-mode="dark"` on `<html>`, the same switch as the colour tokens. Before, `dark:` classes followed the operating system, so an app with its own dark mode could show light parts.

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
