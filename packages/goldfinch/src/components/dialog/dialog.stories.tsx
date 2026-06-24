import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog.Root defaultOpen>
      <Dialog className="p-8">
        <Dialog.Title>Dialog Title</Dialog.Title>
        <p className="text-goldfinch-subtle">Dialog content</p>
      </Dialog>
    </Dialog.Root>
  ),
};
