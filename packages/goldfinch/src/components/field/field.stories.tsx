import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";
import { Input } from "../input";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/field/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/field/usage";
const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field label="Name">
      <Input placeholder="Enter your name..." />
    </Field>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
