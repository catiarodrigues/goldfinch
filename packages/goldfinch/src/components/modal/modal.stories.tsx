import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal.Root defaultOpen>
      <Modal className="p-8">
        <Modal.Title>Modal Title</Modal.Title>
        <p className="text-goldfinch-subtle">Modal content</p>
      </Modal>
    </Modal.Root>
  ),
};
