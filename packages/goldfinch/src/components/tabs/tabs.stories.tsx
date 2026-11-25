import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";
// Docs examples: the same files the docs site renders and shows as code.
import UnderlineExample from "../../../../goldfinch-docs-astro/src/examples/tabs/underline";
import SegmentedExample from "../../../../goldfinch-docs-astro/src/examples/tabs/segmented";
import { expect, userEvent, within } from "storybook/test";

import UsageExample from "../../../../goldfinch-docs-astro/src/examples/tabs/usage";
const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  render: () => <UnderlineExample />,
};
export const Segmented: Story = {
  render: () => <SegmentedExample />,
};

/** Clicking selects a tab; arrow keys move focus along the tab list. */
export const SelectAndArrowKeys: Story = {
  render: () => <UnderlineExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tab", { name: "Preview" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await userEvent.click(canvas.getByRole("tab", { name: "Code" }));
    await expect(canvas.getByRole("tab", { name: "Code" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Props" })).toHaveFocus();
  },
};

export const Usage: Story = { render: () => <UsageExample /> };
