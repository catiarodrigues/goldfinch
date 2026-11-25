import type { Preview } from "@storybook/react-vite";
import { afterEach as checkAccessibility } from "@storybook/addon-a11y/preview";
import "../src/styles/index.css";
import "./preview.css";

const preview: Preview = {
  // Every component gets a generated docs page (props table, stories).
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // Violations fail the story test (and CI).
      test: "error",
      context: {
        // Base UI's focus guards are intentional aria-hidden, focusable
        // sentinels that keep Tab inside popups; axe's aria-hidden-focus
        // rule can't tell them from a real bug.
        exclude: ["[data-base-ui-focus-guard]"],
      },
    },
  },

  // The a11y addon checks each story in light mode; run the same check (same
  // rules and exclusions, same failure) again in dark mode, which apps switch
  // on with data-mode="dark" on <html>. Contrast failures are often dark-only.
  async afterEach(context) {
    const html = context.canvasElement.ownerDocument.documentElement;
    const previous = html.getAttribute("data-mode");
    html.setAttribute("data-mode", "dark");
    try {
      await checkAccessibility(context);
    } finally {
      if (previous === null) html.removeAttribute("data-mode");
      else html.setAttribute("data-mode", previous);
    }
  },
};

export default preview;
