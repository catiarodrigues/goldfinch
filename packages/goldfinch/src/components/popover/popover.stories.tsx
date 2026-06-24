import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Content>
        <Popover.Title>Popover Title</Popover.Title>
        <p>Popover content</p>
      </Popover.Content>
    </Popover>
  ),
};
