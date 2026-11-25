import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible } from "./collapsible";
import { expect, userEvent, waitFor, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/collapsible/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/collapsible/usage";
const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
      <Collapsible.DefaultPanel>
        This is the collapsible content.
      </Collapsible.DefaultPanel>
    </Collapsible.Root>
  ),
};

/** The trigger reports its state and toggles the panel by click and keyboard. */
export const Toggle: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
      <Collapsible.DefaultPanel>Shipped from Lisbon.</Collapsible.DefaultPanel>
    </Collapsible.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Show details" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(await canvas.findByText("Shipped from Lisbon.")).toBeVisible();

    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    // The closed panel is unmounted.
    await waitFor(() =>
      expect(canvas.queryByText("Shipped from Lisbon.")).toBeNull(),
    );
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
