import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toasty } from "./toast";

const meta: Meta<typeof Toasty> = {
  title: "Components/Toast",
  component: Toasty,
};

export default meta;
type Story = StoryObj<typeof Toasty>;
