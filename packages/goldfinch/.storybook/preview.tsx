import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

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
};

export default preview;
