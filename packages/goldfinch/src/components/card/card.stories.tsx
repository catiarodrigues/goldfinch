import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/card/basic";
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "Card content",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };
