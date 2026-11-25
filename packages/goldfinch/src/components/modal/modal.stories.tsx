import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button/button";

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

/** Opens from its trigger, traps focus, closes on Escape and returns focus. */
export const KeyboardAndFocus: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal size="sm" className="p-8">
        <Modal.Title>Delete project?</Modal.Title>
        <Modal.Close>
          <Button>Cancel</Button>
        </Modal.Close>
      </Modal>
    </Modal.Root>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("button", { name: "Open modal" });

    await userEvent.click(trigger);
    const dialog = await page.findByRole("dialog", { name: "Delete project?" });
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
