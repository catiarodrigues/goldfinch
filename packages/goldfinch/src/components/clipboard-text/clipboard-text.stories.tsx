import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardText } from "./clipboard-text";

const meta: Meta<typeof ClipboardText> = {
  title: "Components/Clipboard Text",
  component: ClipboardText,
};

export default meta;
type Story = StoryObj<typeof ClipboardText>;

export const Default: Story = {
  args: {
    text: 'npm install goldfinch',
    labels: { copyAction: 'Copy install command' },
  },
};
