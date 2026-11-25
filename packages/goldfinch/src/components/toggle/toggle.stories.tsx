import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./toggle";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

/** A switch that flips on click and on Space. */
export const SwitchOnAndOff: Story = {
  args: { label: "Enable notifications" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "Enable notifications" });
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
  },
};
