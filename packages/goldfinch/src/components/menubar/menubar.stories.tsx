import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuBar } from "./menubar";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/menubar/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/menubar/usage";
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

    // Wait for focus to land before each key, as a person would.
    await userEvent.tab();
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Search" })).toHaveFocus(),
    );

    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Settings" })).toHaveFocus(),
    );

    await userEvent.keyboard("{ArrowLeft}");
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Search" })).toHaveFocus(),
    );
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Settings" })).toHaveFocus(),
    );

    // The bar is a single Tab stop: Shift+Tab leaves it from any button, and
    // Tab comes back to the button used last.
    await userEvent.tab({ shift: true });
    await waitFor(() =>
      expect(canvasElement).not.toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    await userEvent.tab();
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Settings" })).toHaveFocus(),
    );

    await userEvent.keyboard("{Enter}");
    await expect(onSettings).toHaveBeenCalledOnce();
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
