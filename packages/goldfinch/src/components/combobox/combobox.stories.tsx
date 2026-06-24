import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export const Default: Story = {
  render: () => (
    <Combobox items={fruits}>
      <Combobox.TriggerInput placeholder="Select a fruit..." />
      <Combobox.Content>
        <Combobox.List>
          {(item: string) => <Combobox.Item value={item}>{item}</Combobox.Item>}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};
