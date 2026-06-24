import type { Meta, StoryObj } from "@storybook/react-vite";
import { Meter } from "./meter";

const meta: Meta<typeof Meter> = {
  title: "Components/Meter",
  component: Meter,
};

export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {
  args: {
    value: 60,
    label: 'Progress',
  },
};
