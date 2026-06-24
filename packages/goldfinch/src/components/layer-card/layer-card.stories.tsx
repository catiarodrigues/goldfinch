import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayerCard } from "./layer-card";

const meta: Meta<typeof LayerCard> = {
  title: "Components/Layer Card",
  component: LayerCard,
};

export default meta;
type Story = StoryObj<typeof LayerCard>;

export const Default: Story = {
  args: {
    children: 'Layer card content',
  },
};
