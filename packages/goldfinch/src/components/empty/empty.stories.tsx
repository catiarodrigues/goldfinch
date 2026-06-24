import type { Meta, StoryObj } from "@storybook/react-vite";
import { Empty } from "./empty";

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Try adjusting your search or filters.',
  },
};
