import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup, GOLDFINCH_INPUT_GROUP_VARIANTS } from "./input-group";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/input-group/basic";
const meta: Meta<typeof InputGroup> = {
  title: "Components/Input Group",
  component: InputGroup,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_INPUT_GROUP_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Button variant="primary" aria-label="Search">
        <MagnifyingGlassIcon size={16} />
      </InputGroup.Button>
      <InputGroup.Input placeholder="Search..." aria-label="Search query" />
    </InputGroup>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };
