import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/label/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/label/usage";
const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Email address",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
