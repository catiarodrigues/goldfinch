import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, GOLDFINCH_PAGINATION_VARIANTS } from "./pagination";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/pagination/basic";
const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    controls: {
      control: "select",
      options: Object.keys(GOLDFINCH_PAGINATION_VARIANTS.controls),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 1,
    setPage: () => {},
    perPage: 25,
    totalCount: 500,
  },
};

function StatefulPagination() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} setPage={setPage} perPage={25} totalCount={100} />
  );
}

/** Next/previous move between pages; previous is disabled on the first page. */
export const ChangePage: Story = {
  render: () => <StatefulPagination />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pageInput = canvas.getByRole("textbox", { name: "Page number" });
    await expect(pageInput).toHaveValue("1");
    await expect(
      canvas.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(pageInput).toHaveValue("2");
    await expect(
      canvas.getByRole("button", { name: "Previous page" }),
    ).toBeEnabled();
  },
};

export const Basic: Story = { render: () => <BasicExample /> };
