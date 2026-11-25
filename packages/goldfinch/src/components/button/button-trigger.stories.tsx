import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoIcon } from "@phosphor-icons/react";
import { expect, within } from "storybook/test";
import { Button } from "./button";
import { Modal } from "../modal";
import { Popover } from "../popover";
import { Tooltip } from "../tooltip";

/**
 * Triggers given a <Button> child render as that button: never a button
 * inside a button. Other children (icons, text) keep a focusable wrapper.
 */
const meta: Meta = { title: "Components/Button/As Trigger" };

export default meta;
type Story = StoryObj;

export const ButtonChildIsTheTrigger: Story = {
  render: () => (
    <div className="flex gap-4">
      <Modal.Root defaultOpen>
        <Modal.Trigger>
          <Button>Open modal</Button>
        </Modal.Trigger>
        <Modal size="sm">
          <Modal.Title>Modal</Modal.Title>
          <Modal.Close>
            <Button>Close modal</Button>
          </Modal.Close>
        </Modal>
      </Modal.Root>
      <Popover>
        <Popover.Trigger>
          <Button>Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover>
      <Tooltip content="Tip">
        <Button>Hover me</Button>
      </Tooltip>
      <Tooltip content="About">
        <InfoIcon aria-label="About" />
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // The open modal is portalled to <body>, so search the whole document.
    const page = within(canvasElement.ownerDocument.body);

    await expect(canvasElement.ownerDocument.querySelectorAll("button button")).toHaveLength(0);
    // `hidden: true`: the open modal hides the page behind it from the a11y
    // tree; this checks structure (one button each), not reachability.
    for (const name of ["Open modal", "Close modal", "Open popover", "Hover me"]) {
      await expect(page.getAllByRole("button", { name, hidden: true })).toHaveLength(1);
    }

    // An icon child is still wrapped in a button.
    await expect(page.getByRole("button", { name: "About", hidden: true })).toBeInTheDocument();
  },
};
