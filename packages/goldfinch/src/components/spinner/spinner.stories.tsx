import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, GOLDFINCH_SPINNER_VARIANTS } from "./spinner";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/spinner/basic";
import SizesExample from "../../../../goldfinch-docs-astro/src/examples/spinner/sizes";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/spinner/usage";
const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_SPINNER_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Basic: Story = { render: () => <BasicExample /> };

export const Sizes: Story = { render: () => <SizesExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
