import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuBar } from "./menubar";
import { expect, fn, userEvent, within } from "storybook/test";

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

const onSettings = fn();

/** Arrow keys move focus between items; Enter activates the focused one. */
export const KeyboardNavigation: Story = {
  args: {
    isActive: 0,
    options: [
      { icon: <span aria-hidden>🔍</span>, tooltip: "Search", onClick: fn() },
      {
        icon: <span aria-hidden>⚙️</span>,
        tooltip: "Settings",
        onClick: onSettings,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    onSettings.mockClear();

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Search" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(
      canvas.getByRole("button", { name: "Settings" }),
    ).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(onSettings).toHaveBeenCalledOnce();
  },
};
