import type { Meta, StoryObj } from "@storybook/react-vite";
import { SensitiveInput } from "./sensitive-input";

const meta: Meta<typeof SensitiveInput> = {
  title: "Components/Sensitive Input",
  component: SensitiveInput,
};

export default meta;
type Story = StoryObj<typeof SensitiveInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter sensitive data...',
  },
};
