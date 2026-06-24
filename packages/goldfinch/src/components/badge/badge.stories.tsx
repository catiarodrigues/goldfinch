import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Primary: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Badge',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Badge',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Badge',
    variant: 'error',
  },
};
