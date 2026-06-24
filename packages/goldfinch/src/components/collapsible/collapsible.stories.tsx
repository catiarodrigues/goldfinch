import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible } from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
      <Collapsible.DefaultPanel>
        This is the collapsible content.
      </Collapsible.DefaultPanel>
    </Collapsible.Root>
  ),
};
