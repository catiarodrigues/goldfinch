import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CopyToClipboard,
  GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS,
} from "./copy-to-clipboard";
import { useState } from "react";
import { expect, spyOn, userEvent, within } from "storybook/test";
import { Button } from "../button/button";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/copy-to-clipboard/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/copy-to-clipboard/usage";
const meta: Meta<typeof CopyToClipboard> = {
  title: "Components/CopyToClipboard",
  component: CopyToClipboard,
  // Options come from the variant config, so new variants appear automatically.
  argTypes: {
    size: {
      control: "select",
      options: Object.keys(GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS.size),
    },
  },
};

export default meta;
type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  args: {
    text: "npm install goldfinch",
    labels: { copyAction: "Copy install command" },
  },
};

function SwitchableToken() {
  const [token, setToken] = useState("token-A");
  return (
    <div className="flex items-center gap-4">
      <CopyToClipboard
        text="API token"
        textToCopy={token}
        labels={{ copyAction: "Copy token" }}
      />
      <Button onClick={() => setToken("token-B")}>Rotate token</Button>
    </div>
  );
}

/** Copies the current textToCopy, even after it changes (regression: it used to copy the old value). */
export const CopiesCurrentValue: Story = {
  render: () => <SwitchableToken />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue(
      undefined,
    );

    await userEvent.click(canvas.getByRole("button", { name: "Rotate token" }));
    await userEvent.click(canvas.getByRole("button", { name: "Copy token" }));

    await expect(writeText).toHaveBeenCalledWith("token-B");
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
