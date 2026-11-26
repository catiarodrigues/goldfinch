import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "./button";
import {
  expect,
  fn,
  spyOn,
  userEvent,
  within,
  type MockInstance,
} from "storybook/test";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/button/basic";
import SizesExample from "../../../../goldfinch-docs-astro/src/examples/button/sizes";
import ShapeExample from "../../../../goldfinch-docs-astro/src/examples/button/shape";
import LoadingExample from "../../../../goldfinch-docs-astro/src/examples/button/loading";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/button/usage";
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "base", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Sizes: Story = { render: () => <SizesExample /> };

export const Shape: Story = { render: () => <ShapeExample /> };

export const Loading: Story = { render: () => <LoadingExample /> };

export const Usage: Story = { render: () => <UsageExample /> };

let warn: MockInstance<typeof console.warn>;

export const UnknownVariantFallsBack: Story = {
  // A typo, or a value from untyped code, shouldn't break the button.
  beforeEach: () => {
    warn = spyOn(console, "warn").mockImplementation(() => {});
    return () => warn.mockRestore();
  },
  render: () => (
    <Button variant={"pirmary" as ButtonProps["variant"]}>Save</Button>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Save" });
    // The warning is development-only, like every Goldfinch dev check, so a
    // production Storybook build (as Chromatic tests) doesn't log it.
    if (process.env.NODE_ENV !== "production") {
      await expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Unknown variant "pirmary"'),
      );
    }
    // Falls back to the default, secondary, look.
    await expect(button.className).toContain("bg-goldfinch-base");
  },
};

const onSave = fn();

export const LoadingKeepsFocus: Story = {
  render: () => (
    <Button variant="primary" loading onClick={onSave}>
      Saving…
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "Saving…",
    });
    onSave.mockClear();

    // Busy and blocked, but still reachable and focusable by keyboard.
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Clicks and Enter do nothing while it loads.
    await userEvent.click(button);
    await userEvent.keyboard("{Enter}");
    await expect(onSave).not.toHaveBeenCalled();
  },
};
