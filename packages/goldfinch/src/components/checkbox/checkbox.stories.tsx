import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms",
  },
};

/** Clicking the label or pressing Space toggles it. */
export const ToggleByLabelAndKeyboard: Story = {
  args: { label: "Accept terms" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = canvas.getByRole("checkbox", { name: "Accept terms" });

    await userEvent.click(canvas.getByText("Accept terms"));
    await expect(box).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard(" ");
    await expect(box).toHaveAttribute("aria-checked", "false");
  },
};
