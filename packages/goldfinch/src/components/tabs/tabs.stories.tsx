import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, type TabsItem } from "./tabs";

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
  return <Tabs tabs={items} variant={variant} value={tab} onValueChange={setTab} />;
}

export const Underline: Story = { render: () => <ControlledTabs variant="underline" /> };
export const Segmented: Story = { render: () => <ControlledTabs variant="segmented" /> };
