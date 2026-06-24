import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "./input-group";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const meta: Meta<typeof InputGroup> = {
  title: "Components/Input Group",
  component: InputGroup,
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Button variant="primary">
        <MagnifyingGlassIcon size={16} />
      </InputGroup.Button>
      <InputGroup.Input placeholder="Search..." />
    </InputGroup>
  ),
};
