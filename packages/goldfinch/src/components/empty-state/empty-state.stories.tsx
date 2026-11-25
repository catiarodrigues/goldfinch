import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState, GOLDFINCH_EMPTY_STATE_VARIANTS } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_EMPTY_STATE_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "Try adjusting your search or filters.",
  },
};
