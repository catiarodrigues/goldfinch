import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "./banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'This is an informational banner.',
  },
};

export const Alert: Story = {
  args: {
    children: 'This is an informational banner.',
    variant: 'alert',
  },
};

export const Error: Story = {
  args: {
    children: 'This is an informational banner.',
    variant: 'error',
  },
};
