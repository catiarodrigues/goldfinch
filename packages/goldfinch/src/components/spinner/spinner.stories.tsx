import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, GOLDFINCH_SPINNER_VARIANTS } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_SPINNER_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
