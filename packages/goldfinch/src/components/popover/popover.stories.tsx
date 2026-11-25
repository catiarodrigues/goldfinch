import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./popover";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button/button";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/popover/basic";
const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Popover Title</Popover.Title>
        <p>Popover content</p>
      </Popover.Content>
    </Popover>
  ),
};

/** Opens on click, closes on Escape, and returns focus to the trigger. */
export const OpenAndDismiss: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Details</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Shipping</Popover.Title>
        <p>Arrives in 2–3 days.</p>
      </Popover.Content>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("button", { name: "Details" });

    await userEvent.click(trigger);
    const popup = await page.findByRole("dialog", { name: "Shipping" });
    await waitFor(() => expect(popup).toBeVisible()); // after the open animation
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const Basic: Story = { render: () => <BasicExample /> };
