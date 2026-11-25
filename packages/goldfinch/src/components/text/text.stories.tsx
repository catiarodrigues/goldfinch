import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, GOLDFINCH_TEXT_VARIANTS } from "./text";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/text/basic";
const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_TEXT_VARIANTS.variant),
    },
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_TEXT_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Sample text content",
    as: "p",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };
