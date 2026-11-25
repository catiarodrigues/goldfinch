import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Toasty, useGoldfinchToastManager } from "./toast";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
