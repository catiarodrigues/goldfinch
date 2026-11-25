import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toolbar, GOLDFINCH_TOOLBAR_VARIANTS } from "./toolbar";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/toolbar/basic";
const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_TOOLBAR_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: (args) => (
    <Toolbar aria-label="Formatting" {...args}>
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Button>Underline</Toolbar.Button>
    </Toolbar>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };
