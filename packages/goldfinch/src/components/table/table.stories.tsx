import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, GOLDFINCH_TABLE_VARIANTS } from "./table";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/table/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/table/usage";
const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    layout: {
      control: "select",
      options: Object.keys(GOLDFINCH_TABLE_VARIANTS.layout),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>Engineer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bob</Table.Cell>
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
