import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, GOLDFINCH_GRID_VARIANTS } from "./grid";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/grid/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/grid/usage";
const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_GRID_VARIANTS.variant),
    },
    gap: {
      control: "select",
      options: Object.keys(GOLDFINCH_GRID_VARIANTS.gap),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    children: "Grid content",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
