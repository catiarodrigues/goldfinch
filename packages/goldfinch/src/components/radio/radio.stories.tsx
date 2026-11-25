import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./radio";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <Radio.Group legend="Options" defaultValue="option1">
      <Radio.Item label="Option 1" value="option1" />
      <Radio.Item label="Option 2" value="option2" />
      <Radio.Item label="Option 3" value="option3" />
    </Radio.Group>
  ),
};

/** Tab enters the group on the checked radio; arrow keys move the selection. */
export const ArrowKeys: Story = {
  render: () => (
    <Radio.Group legend="Delivery" defaultValue="standard">
      <Radio.Item label="Standard" value="standard" />
      <Radio.Item label="Express" value="express" />
    </Radio.Group>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("radiogroup", { name: "Delivery" }),
    ).toBeInTheDocument();

    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "Standard" })).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    const express = canvas.getByRole("radio", { name: "Express" });
    await expect(express).toHaveFocus();
    await expect(express).toHaveAttribute("aria-checked", "true");
  },
};
