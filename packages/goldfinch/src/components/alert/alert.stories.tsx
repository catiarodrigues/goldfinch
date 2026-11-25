import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, GOLDFINCH_ALERT_VARIANTS } from "./alert";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/alert/basic";
import VariantsExample from "../../../../goldfinch-docs-astro/src/examples/alert/variants";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/alert/usage";
const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_ALERT_VARIANTS.variant),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: "This is an informational alert.",
  },
};

export const AlertStory: Story = {
  args: {
    children: "This is an informational alert.",
    variant: "alert",
  },
};

export const Error: Story = {
  args: {
    children: "This is an informational alert.",
    variant: "error",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Variants: Story = { render: () => <VariantsExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
