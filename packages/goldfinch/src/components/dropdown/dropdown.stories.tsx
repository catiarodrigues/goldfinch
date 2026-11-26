import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu } from "./dropdown";
import { Button } from "../button/button";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/dropdown/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/dropdown/usage";
const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown",
  component: DropdownMenu,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

const onDuplicate = fn();

/** Arrow keys move through items, Enter activates, focus returns to the trigger. */
export const KeyboardNavigation: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item onClick={onDuplicate}>Duplicate</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("button", { name: "Actions" });
    onDuplicate.mockClear();

    // Reach the trigger with Tab, as a keyboard user would, and wait for
    // focus to land before each key.
    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(page.getByRole("menuitem", { name: "Edit" })).toHaveFocus(),
    );

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(page.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus(),
    );
    await userEvent.keyboard("{Enter}");

    await expect(onDuplicate).toHaveBeenCalledOnce();
    await waitFor(() => expect(page.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const EscapeAndTypeahead: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>More</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Rename</DropdownMenu.Item>
        <DropdownMenu.Item>Archive</DropdownMenu.Item>
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("button", { name: "More" });

    await userEvent.click(trigger);
    // Wait for the menu to take focus before typing, as a person would.
    const menu = await page.findByRole("menu");
    await waitFor(() =>
      expect(menu).toContainElement(document.activeElement as HTMLElement),
    );

    // Typing a letter moves to the first item that starts with it.
    await userEvent.keyboard("d");
    await waitFor(() =>
      expect(page.getByRole("menuitem", { name: "Delete" })).toHaveFocus(),
    );

    // Escape closes the menu and returns focus to the trigger.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
