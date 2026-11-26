import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/select/basic";
import ItemsExample from "../../../../goldfinch-docs-astro/src/examples/select/items";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/select/usage";
const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select placeholder="Choose an option...">
      <Select.Option value="apple">Apple</Select.Option>
      <Select.Option value="banana">Banana</Select.Option>
      <Select.Option value="cherry">Cherry</Select.Option>
    </Select>
  ),
};

const onFruitChange = fn();

/** Picking an option updates the trigger and calls onValueChange. */
export const ChooseAnOption: Story = {
  render: () => (
    <Select
      label="Fruit"
      placeholder="Choose a fruit…"
      onValueChange={onFruitChange}
    >
      <Select.Option value="apple">Apple</Select.Option>
      <Select.Option value="banana">Banana</Select.Option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("combobox", { name: "Fruit" });
    onFruitChange.mockClear();

    await userEvent.click(trigger);
    await userEvent.click(await page.findByRole("option", { name: "Banana" }));

    await expect(onFruitChange).toHaveBeenCalledWith(
      "banana",
      expect.anything(),
    );
    await waitFor(() => expect(page.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveTextContent("Banana");
  },
};

const onSizeChange = fn();

export const KeyboardSelection: Story = {
  render: () => (
    <Select
      label="Size"
      placeholder="Choose a size…"
      onValueChange={onSizeChange}
    >
      <Select.Option value="small">Small</Select.Option>
      <Select.Option value="medium">Medium</Select.Option>
      <Select.Option value="large">Large</Select.Option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    const trigger = page.getByRole("combobox", { name: "Size" });
    onSizeChange.mockClear();

    // Open with the keyboard, move with the arrows, choose with Enter.
    // Each time the list opens, wait for it to take focus before typing,
    // as a person would see it open first.
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(page.getByRole("listbox")).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(page.getByRole("listbox")).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await waitFor(() =>
      expect(page.getByRole("option", { name: "Large" })).toHaveFocus(),
    );
    await userEvent.keyboard("{Enter}");

    await expect(onSizeChange).toHaveBeenCalledWith("large", expect.anything());
    await waitFor(() => expect(page.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveTextContent("Large");

    // Typeahead: typing a letter in the open list jumps to the match.
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(page.getByRole("listbox")).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    await userEvent.keyboard("m");
    await waitFor(() =>
      expect(page.getByRole("option", { name: "Medium" })).toHaveFocus(),
    );
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Items: Story = { render: () => <ItemsExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
