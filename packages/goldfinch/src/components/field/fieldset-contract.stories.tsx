import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, within } from "storybook/test";
import type { FieldErrorProp } from "./field";
import { Checkbox } from "../checkbox";
import { Radio } from "../radio";
import { Toggle } from "../toggle";

/**
 * The Fieldset contract, checked once per group: the legend names the group,
 * the description and field error are linked to it, and the group is invalid
 * exactly while its error shows.
 */
const meta: Meta = { title: "Components/Field/Fieldset Contract" };

export default meta;
type Story = StoryObj;

type CaseProps = { description?: string; error?: FieldErrorProp };

const CASES: Record<string, CaseProps> = {
  legend: {},
  error: { error: "Pick one" },
  description: { description: "You can change this later" },
  // Shown only on the browser's validity failure, which hasn't happened yet.
  match: { error: { message: "Required", match: "valueMissing" } },
};

const describedBy = (el: HTMLElement) => el.getAttribute("aria-describedby") ?? "";

function contract(role: string, render: (props: CaseProps) => ReactNode): Story {
  return {
    render: () => (
      <div className="flex flex-col gap-8">
        {Object.entries(CASES).map(([name, props]) => (
          <div key={name} data-testid={name}>
            {render(props)}
          </div>
        ))}
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const group = (id: string) =>
        within(canvas.getByTestId(id)).getByRole(role, { name: "Contact" });

      // legend: names the group, not invalid
      await expect(group("legend")).not.toHaveAttribute("data-invalid");

      // error: message shown, group invalid, message linked
      const errored = group("error");
      const message = within(canvas.getByTestId("error")).getByText("Pick one");
      await expect(errored).toHaveAttribute("data-invalid");
      await expect(describedBy(errored)).toContain(message.id);

      // description: shown and linked, not invalid
      const described = group("description");
      const description = within(canvas.getByTestId("description")).getByText(
        "You can change this later",
      );
      await expect(described).not.toHaveAttribute("data-invalid");
      await expect(describedBy(described)).toContain(description.id);

      // match error before the browser reports the failure: no message, not invalid
      await expect(within(canvas.getByTestId("match")).queryByText("Required")).toBeNull();
      await expect(group("match")).not.toHaveAttribute("data-invalid");
    },
  };
}

export const CheckboxGroupContract = contract("group", (p) => (
  <Checkbox.Group legend="Contact" {...p}>
    <Checkbox.Item value="email" label="Email" />
    <Checkbox.Item value="sms" label="SMS" />
  </Checkbox.Group>
));

export const RadioGroupContract = contract("radiogroup", (p) => (
  <Radio.Group legend="Contact" {...p}>
    <Radio.Item value="email" label="Email" />
    <Radio.Item value="sms" label="SMS" />
  </Radio.Group>
));

export const ToggleGroupContract = contract("group", (p) => (
  <Toggle.Group legend="Contact" {...p}>
    <Toggle.Item label="Email" />
    <Toggle.Item label="SMS" />
  </Toggle.Group>
));
