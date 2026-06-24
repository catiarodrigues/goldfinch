import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    children: 'Grid content',
  },
};
