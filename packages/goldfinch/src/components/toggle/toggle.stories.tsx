import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle, GOLDFINCH_TOGGLE_VARIANTS } from "./toggle";
import { expect, userEvent, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/toggle/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/toggle/usage";
const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_TOGGLE_VARIANTS.size),
    },
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_TOGGLE_VARIANTS.variant),
    },
  },
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

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
