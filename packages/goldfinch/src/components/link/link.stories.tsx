import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, GOLDFINCH_LINK_VARIANTS } from "./link";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/link/basic";
const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(GOLDFINCH_LINK_VARIANTS.variant),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Click here",
    href: "#",
  },
};

export const Basic: Story = { render: () => <BasicExample /> };
