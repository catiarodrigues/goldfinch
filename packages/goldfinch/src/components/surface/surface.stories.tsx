import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "./surface";

const meta: Meta<typeof Surface> = {
  title: "Components/Surface",
  component: Surface,
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    children: 'Surface content',
  },
};
