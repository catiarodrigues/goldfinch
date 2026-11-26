---
"@catiarodrigues/goldfinch": minor
---

`TopNavigation` works on narrow screens and with links:

- `TopNavigation.NavItem` takes `href` and renders a real link, using the `LinkProvider` component so router links work. `active` also sets `aria-current="page"`. Before, items were plain text that keyboard and screen reader users couldn't reach; items without `href` still render as before.
- When the bar is narrower than 42rem, the links collapse into a Menu button that opens them in a panel. The bar measures its own width, not the window's. Escape or choosing a link closes the panel. `TopNavigation.Nav` takes `label` (the landmark's name, "Main" by default) and `menuLabel` ("Menu").

`Button` reads its variant, size and shape through `resolveVariant`, like the other components: an unknown value warns in development and falls back to the default instead of rendering an unstyled button.
