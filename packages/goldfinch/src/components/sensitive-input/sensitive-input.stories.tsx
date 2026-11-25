import type { Meta, StoryObj } from "@storybook/react-vite";
import { SensitiveInput } from "./sensitive-input";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta: Meta<typeof SensitiveInput> = {
  title: "Components/Sensitive Input",
  component: SensitiveInput,
};

export default meta;
type Story = StoryObj<typeof SensitiveInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter sensitive data...",
  },
};

/**
 * A saved value starts masked. Keyboard users reveal it with the eye button;
 * clicking the masked value also reveals it. Hiding masks it again.
 */
export const RevealAndHide: Story = {
  args: { label: "API key", defaultValue: "sk_live_123" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue("sk_live_123");
    await expect(input).toHaveAttribute("type", "password");

    // Keyboard: Tab to the eye button, Enter reveals.
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Reveal API key" }),
    ).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(input).toHaveAttribute("type", "text"));

    await userEvent.click(canvas.getByRole("button", { name: "Hide API key" }));
    await waitFor(() => expect(input).toHaveAttribute("type", "password"));

    // Mouse: clicking the masked value reveals it too.
    await userEvent.click(input.parentElement as HTMLElement);
    await waitFor(() => expect(input).toHaveAttribute("type", "text"));
  },
};
