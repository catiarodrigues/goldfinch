import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./combobox";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

// Docs examples: the same files the docs site renders and shows as code.
import BasicExample from "../../../../goldfinch-docs-astro/src/examples/combobox/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/combobox/usage";
import ValidationExample from "../../../../goldfinch-docs-astro/src/examples/combobox/validation";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    label: "Fruit",
    items: ["Apple", "Banana", "Cherry"],
    placeholder: "Search fruit…",
  },
};

const onCountryChange = fn();

export const TypeToFilter: Story = {
  render: () => (
    <Combobox
      label="Country"
      items={[
        { value: "pt", label: "Portugal" },
        { value: "es", label: "Spain" },
        { value: "fr", label: "France" },
      ]}
      onValueChange={onCountryChange}
      emptyMessage="No countries found"
    />
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    const input = page.getByRole("combobox", { name: "Country" });
    onCountryChange.mockClear();

    // Typing filters the list to the options that match.
    await userEvent.click(input);
    await userEvent.type(input, "spa");
    await waitFor(async () =>
      expect(await page.findAllByRole("option")).toHaveLength(1),
    );
    await expect(page.getByRole("option", { name: "Spain" })).toBeVisible();

    // The arrow keys move through the matches; Enter chooses one.
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(onCountryChange).toHaveBeenCalledWith("es");
    await waitFor(() => expect(input).toHaveValue("Spain"));
    await waitFor(() => expect(page.queryByRole("listbox")).toBeNull());
    await expect(input).toHaveFocus();

    // No match shows the empty message instead of an empty list.
    await userEvent.clear(input);
    await userEvent.type(input, "xyz");
    await expect(await page.findByText("No countries found")).toBeVisible();
    await expect(page.queryAllByRole("option")).toHaveLength(0);

    // Escape closes the list and keeps focus in the input.
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(page.queryByText("No countries found")).toBeNull(),
    );
    await expect(input).toHaveFocus();
  },
};

export const InvalidState: Story = {
  render: () => <ValidationExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Time zone" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Choose a time zone");
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
