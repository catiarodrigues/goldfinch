import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Sample text content',
    as: 'p',
  },
};
