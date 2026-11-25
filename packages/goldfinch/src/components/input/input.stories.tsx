import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/input/basic";
import VariantsExample from "../../../../goldfinch-docs-astro/src/examples/input/variants";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/input/usage";
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Variants: Story = { render: () => <VariantsExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
