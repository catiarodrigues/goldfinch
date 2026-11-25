import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOfContents } from "./table-of-contents";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/table-of-contents/basic";
const meta: Meta<typeof TableOfContents> = {
  title: "Components/Table Of Contents",
  component: TableOfContents,
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
  render: () => (
    <TableOfContents>
      <TableOfContents.List>
        <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
        <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
        <TableOfContents.Item href="#api">API</TableOfContents.Item>
      </TableOfContents.List>
    </TableOfContents>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };
