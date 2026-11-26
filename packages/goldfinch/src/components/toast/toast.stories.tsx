import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Toasty, useGoldfinchToastManager } from "./toast";
import { expect, userEvent, waitFor, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/toast/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/toast/usage";
const meta: Meta<typeof Toasty> = {
  title: "Components/Toast",
  component: Toasty,
};

export default meta;
type Story = StoryObj<typeof Toasty>;

function ShowToastButton() {
  const toast = useGoldfinchToastManager();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Hello!",
          description: "This is a toast notification.",
        })
      }
    >
      Show Toast
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <Toasty>
      <ShowToastButton />
    </Toasty>
  ),
};

/** A toast appears with its message and can be dismissed with its close button. */
export const ShowAndDismiss: Story = {
  render: () => (
    <Toasty>
      <ShowToastButton />
    </Toasty>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(page.getByRole("button", { name: "Show Toast" }));
    const message = await page.findByText("This is a toast notification.");
    await expect(message).toBeVisible();

    // Base UI hides Close from assistive tech until the stack is expanded
    // (hover or focus); collapsed toasts are announced via a live region.
    await userEvent.hover(message);
    await userEvent.click(await page.findByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(page.queryByText("This is a toast notification.")).toBeNull(),
    );
  },
};

export const KeyboardDismiss: Story = {
  render: () => (
    <Toasty>
      <ShowToastButton />
    </Toasty>
  ),
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    const show = page.getByRole("button", { name: "Show Toast" });
    await userEvent.click(show);
    await page.findByText("This is a toast notification.");

    // F6 jumps to the toast region without hunting for it with Tab. Tab then
    // reaches the toast, then its Close button, and Enter dismisses it.
    await userEvent.keyboard("{F6}");
    await waitFor(() =>
      expect(page.getByRole("region")).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    await userEvent.tab();
    await userEvent.tab();
    const close = await page.findByRole("button", { name: "Close" });
    await waitFor(() => expect(close).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(page.queryByText("This is a toast notification.")).toBeNull(),
    );
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
