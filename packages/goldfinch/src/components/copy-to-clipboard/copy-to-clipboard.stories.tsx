import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyToClipboard } from "./copy-to-clipboard";
import { useState } from "react";
import { expect, spyOn, userEvent, within } from "storybook/test";
import { Button } from "../button/button";

const meta: Meta<typeof CopyToClipboard> = {
  title: "Components/CopyToClipboard",
  component: CopyToClipboard,
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
