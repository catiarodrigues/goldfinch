import type { Meta, StoryObj } from "@storybook/react-vite";
import { Page } from "./page";

const meta: Meta<typeof Page> = {
  title: "Components/Page",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => (
    <Page size="sm">
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
