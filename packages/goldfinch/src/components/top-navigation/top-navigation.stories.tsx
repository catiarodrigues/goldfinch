import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopNavigation } from "./top-navigation";
import { forwardRef } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import {
  LinkProvider,
  type LinkComponentProps,
} from "../../utils/link-provider";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/top-navigation/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/top-navigation/usage";
const meta: Meta<typeof TopNavigation> = {
  title: "Components/Top Navigation",
  component: TopNavigation,
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = { render: () => <BasicExample /> };

// Stands in for a router's Link: records the navigation instead of leaving the page.
const onNavigate = fn();
const RouterLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  function RouterLink({ to, href, onClick, children, ...rest }, ref) {
    return (
      <a
        ref={ref}
        href={href ?? to}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(href ?? to);
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

export const NarrowMenu: Story = {
  render: () => (
    // The header collapses by its own width, not the window's.
    <LinkProvider component={RouterLink}>
      <div style={{ width: 380 }}>
        <BasicExample />
      </div>
    </LinkProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menu = canvas.getByRole("button", { name: "Menu" });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("link", { name: "Blog" })).toBeNull();

    await userEvent.click(menu);
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(canvas.getByRole("link", { name: "Blog" })).toBeVisible();

    // Choosing a link navigates through the LinkProvider and closes the panel.
    onNavigate.mockClear();
    await userEvent.click(canvas.getByRole("link", { name: "Blog" }));
    await expect(onNavigate).toHaveBeenCalledWith("#blog");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(menu);

    // Escape closes the panel and returns focus to the Menu button.
    await userEvent.keyboard("{Escape}");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("link", { name: "Blog" })).toBeNull();
    await waitFor(() => expect(menu).toHaveFocus());
  },
};

export const WideLinks: Story = {
  render: () => (
    <div style={{ width: 900 }}>
      <BasicExample />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wide enough: the links show inline and the Menu button is hidden.
    await expect(
      canvas.getByRole("link", { name: "Components" }),
    ).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Menu" })).toBeNull();
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
