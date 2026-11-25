import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, type TabsItem } from "./tabs";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items: TabsItem[] = [
  { value: "preview", label: "Preview" },
  { value: "code", label: "Code" },
  { value: "props", label: "Props" },
];

function ControlledTabs({ variant }: { variant: "underline" | "segmented" }) {
  const [tab, setTab] = useState("preview");
  return (
    <Tabs tabs={items} variant={variant} value={tab} onValueChange={setTab} />
  );
}

export const Underline: Story = {
  render: () => <ControlledTabs variant="underline" />,
};
export const Segmented: Story = {
  render: () => <ControlledTabs variant="segmented" />,
};

/** Clicking selects a tab; arrow keys move focus along the tab list. */
export const SelectAndArrowKeys: Story = {
  render: () => <ControlledTabs variant="underline" />,
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
