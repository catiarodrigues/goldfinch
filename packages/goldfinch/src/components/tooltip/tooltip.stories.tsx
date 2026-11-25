import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, GOLDFINCH_TOOLTIP_VARIANTS } from "./tooltip";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button/button";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/tooltip/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/tooltip/usage";
const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    side: {
      control: "select",
      options: Object.keys(GOLDFINCH_TOOLTIP_VARIANTS.side),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Tooltip text",
    children: "Hover me",
  },
};

/** Shows on keyboard focus (not just hover) and hides on Escape. */
export const ShowsOnFocus: Story = {
  render: () => (
    <Tooltip content="Saves a copy" delay={0}>
      <Button>Duplicate</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    // Popups render in a portal outside the story root.
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.tab();
    await expect(page.getByRole("button", { name: "Duplicate" })).toHaveFocus();
    await expect(await page.findByText("Saves a copy")).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByText("Saves a copy")).toBeNull());
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
