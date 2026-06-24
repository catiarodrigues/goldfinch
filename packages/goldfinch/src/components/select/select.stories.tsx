import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select placeholder="Choose an option...">
      <Select.Option value="apple">Apple</Select.Option>
      <Select.Option value="banana">Banana</Select.Option>
      <Select.Option value="cherry">Cherry</Select.Option>
    </Select>
  ),
};
