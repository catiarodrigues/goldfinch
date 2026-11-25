import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Toasty, useGoldfinchToastManager } from "./toast";

const meta: Meta<typeof Toasty> = {
  title: "Components/Toast",
  component: Toasty,
};

export default meta;
type Story = StoryObj<typeof Toasty>;

function ShowToastButton() {
  const toast = useGoldfinchToastManager();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Hello!",
          description: "This is a toast notification.",
        })
      }
    >
      Show Toast
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <Toasty>
      <ShowToastButton />
    </Toasty>
  ),
};
