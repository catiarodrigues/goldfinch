import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an informational alert.',
  },
};

export const AlertStory: Story = {
  args: {
    children: 'This is an informational alert.',
    variant: 'alert',
  },
};

export const Error: Story = {
  args: {
    children: 'This is an informational alert.',
    variant: 'error',
  },
};
