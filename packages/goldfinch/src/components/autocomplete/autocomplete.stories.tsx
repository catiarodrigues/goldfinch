import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

export const Default: Story = {
  render: () => (
    <Autocomplete items={fruits}>
      <Autocomplete.InputGroup placeholder="Search fruit..." />
      <Autocomplete.Content>
        <Autocomplete.List>
          {(item: string) => (
            <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
          )}
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  ),
};
