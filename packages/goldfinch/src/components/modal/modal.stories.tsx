import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, GOLDFINCH_MODAL_VARIANTS } from "./modal";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button/button";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/modal/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/modal/usage";
const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_MODAL_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => (
    <Modal.Root defaultOpen>
      <Modal className="p-8" {...args}>
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

    // Focus is trapped: Tab and Shift+Tab never leave the open modal. At the
    // edges, Tab lands on Base UI's invisible focus guard, which sends focus
    // back inside a moment later, so wait for it.
    for (const key of ["{Tab}", "{Tab}", "{Shift>}{Tab}{/Shift}"]) {
      await userEvent.keyboard(key);
      await waitFor(() =>
        expect(dialog).toContainElement(document.activeElement as HTMLElement),
      );
    }

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
