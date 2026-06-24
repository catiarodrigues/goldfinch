import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuBar } from "./menubar";

const meta: Meta<typeof MenuBar> = {
  title: "Components/Menubar",
  component: MenuBar,
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

export const Default: Story = {
  args: {
    isActive: 0,
    options: [
      { icon: <span>🔍</span>, tooltip: "Search", onClick: () => {} },
      { icon: <span>⚙️</span>, tooltip: "Settings", onClick: () => {} },
    ],
  },
};
