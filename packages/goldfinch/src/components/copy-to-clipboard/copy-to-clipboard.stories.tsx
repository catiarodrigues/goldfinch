import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyToClipboard } from "./copy-to-clipboard";

const meta: Meta<typeof CopyToClipboard> = {
  title: "Components/CopyToClipboard",
  component: CopyToClipboard,
};

export default meta;
type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  args: {
    text: 'npm install goldfinch',
    labels: { copyAction: 'Copy install command' },
  },
};
