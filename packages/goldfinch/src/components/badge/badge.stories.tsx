import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, GOLDFINCH_BADGE_VARIANTS } from "./badge";

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
