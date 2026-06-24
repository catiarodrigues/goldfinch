import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;
