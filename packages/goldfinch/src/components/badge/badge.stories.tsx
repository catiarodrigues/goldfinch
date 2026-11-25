import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, GOLDFINCH_BADGE_VARIANTS } from "./badge";
// Docs examples: the same files the docs site renders and shows as code.
import SemanticVariantsExample from "../../../../goldfinch-docs-astro/src/examples/badge/semantic-variants";
import ColorVariantsExample from "../../../../goldfinch-docs-astro/src/examples/badge/color-variants";
import DotExample from "../../../../goldfinch-docs-astro/src/examples/badge/dot";
import InSentenceExample from "../../../../goldfinch-docs-astro/src/examples/badge/in-sentence";
import SizesExample from "../../../../goldfinch-docs-astro/src/examples/badge/sizes";

import UsageExample from "../../../../goldfinch-docs-astro/src/examples/badge/usage";
const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_BADGE_VARIANTS.variant),
    },
    appearance: {
      control: "select",
      options: Object.keys(GOLDFINCH_BADGE_VARIANTS.appearance),
    },
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_BADGE_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Primary: Story = {
  args: {
    children: "Badge",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Badge",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Badge",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Badge",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Badge",
    variant: "error",
  },
};

export const SemanticVariants: Story = {
  render: () => <SemanticVariantsExample />,
};
export const ColorVariants: Story = { render: () => <ColorVariantsExample /> };
export const Dot: Story = { render: () => <DotExample /> };
export const InSentence: Story = { render: () => <InSentenceExample /> };
export const Sizes: Story = { render: () => <SizesExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
