import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb, GOLDFINCH_BREADCRUMBS_VARIANTS } from "./breadcrumbs";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/breadcrumbs/basic";
const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumb,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_BREADCRUMBS_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Current>Components</Breadcrumb.Current>
    </Breadcrumb>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };
