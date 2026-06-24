import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <Radio.Group legend="Options" defaultValue="option1">
      <Radio.Item label="Option 1" value="option1" />
      <Radio.Item label="Option 2" value="option2" />
      <Radio.Item label="Option 3" value="option3" />
    </Radio.Group>
  ),
};
