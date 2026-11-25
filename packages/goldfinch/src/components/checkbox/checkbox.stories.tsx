import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, GOLDFINCH_CHECKBOX_VARIANTS } from "./checkbox";
import { expect, userEvent, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/checkbox/basic";
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_CHECKBOX_VARIANTS.variant),
    },
  },
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

export const Basic: Story = { render: () => <BasicExample /> };
