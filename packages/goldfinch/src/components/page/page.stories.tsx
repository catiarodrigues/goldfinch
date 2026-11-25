import type { Meta, StoryObj } from "@storybook/react-vite";
import { Page, GOLDFINCH_PAGE_VARIANTS } from "./page";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/page/basic";
const meta: Meta<typeof Page> = {
  title: "Components/Page",
  component: Page,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_PAGE_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Page {...args}>
      <Page.Breadcrumbs>Home / Components</Page.Breadcrumbs>
      <Page.Title>Button</Page.Title>
      <Page.Description>
        Clickable controls for forms, dialogs, and action bars.
      </Page.Description>
      <p className="pt-4 text-goldfinch-default">
        This content is constrained to a max-width container with consistent
        padding.
      </p>
    </Page>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };
