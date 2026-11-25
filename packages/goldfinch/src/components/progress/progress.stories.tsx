import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/progress/basic";
import SizesExample from "../../../../goldfinch-docs-astro/src/examples/progress/sizes";
const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    label: "Progress",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Sizes: Story = { render: () => <SizesExample /> };
