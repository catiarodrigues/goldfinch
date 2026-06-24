import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOfContents } from "./table-of-contents";

const meta: Meta<typeof TableOfContents> = {
  title: "Components/Table Of Contents",
  component: TableOfContents,
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;
