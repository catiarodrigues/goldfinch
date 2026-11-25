import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

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
