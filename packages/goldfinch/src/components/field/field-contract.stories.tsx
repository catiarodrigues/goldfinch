import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, spyOn, within } from "storybook/test";
import { Field, type FieldErrorProp } from "./field";
import { Input, InputArea } from "../input";
import { SensitiveInput } from "../sensitive-input/sensitive-input";
import { InputGroup } from "../input-group";
import { Select } from "../select";
import { Checkbox } from "../checkbox";
import { Toggle } from "../toggle";

/**
 * The Field contract, checked once per form control through the same cases:
 * every control gets its label, description and field error from Field, and
 * the message, invalid styling and aria-invalid always agree.
 */
const meta: Meta = {
  title: "Components/Field/Contract",
  // Fail if any control warns about a missing accessible name when it has one.
  beforeEach() {
    spyOn(console, "warn");
  },
};

export default meta;
type Story = StoryObj;

type CaseProps = {
  label?: string;
  "aria-label"?: string;
  description?: string;
  error?: FieldErrorProp;
  required?: boolean;
};

const CASES: Record<string, CaseProps> = {
  label: { label: "Email" },
  error: { "aria-label": "Email", error: "Already taken" },
  description: { label: "Email", description: "We never share it" },
  // Shown only when the browser's validation reports a missing value,
  // which hasn't happened yet: nothing invalid on first render.
  match: { label: "Email", required: true, error: { message: "Required", match: "valueMissing" } },
};

function Matrix({ render }: { render: (props: CaseProps) => ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(CASES).map(([name, props]) => (
        <div key={name} data-testid={name}>
          {render(props)}
        </div>
      ))}
      <div data-testid="outer-field">
        <Field label="Email">{render({})}</Field>
      </div>
    </div>
  );
}

/** `role` to find the control by; `"label"` finds it by label instead (e.g. password inputs have no role). */
function contract(role: string, render: (props: CaseProps) => ReactNode): Story {
  return {
    render: () => <Matrix render={render} />,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const control = (id: string) =>
        role === "label"
          ? within(canvas.getByTestId(id)).getByLabelText(/Email/, { selector: "input" })
          : within(canvas.getByTestId(id)).getByRole(role, { name: /Email/ });
      const describedBy = (el: HTMLElement) => el.getAttribute("aria-describedby") ?? "";

      // label: named by its label, not invalid
      await expect(control("label")).not.toHaveAttribute("aria-invalid", "true");

      // error without a label: message shown, control invalid, message linked
      const errored = control("error");
      const message = within(canvas.getByTestId("error")).getByText("Already taken");
      await expect(errored).toHaveAttribute("aria-invalid", "true");
      await expect(describedBy(errored)).toContain(message.id);

      // description: shown and linked, not invalid
      const described = control("description");
      const description = within(canvas.getByTestId("description")).getByText("We never share it");
      await expect(described).not.toHaveAttribute("aria-invalid", "true");
      await expect(describedBy(described)).toContain(description.id);

      // match error before the browser reports the failure: no message, not invalid
      await expect(within(canvas.getByTestId("match")).queryByText("Required")).toBeNull();
      await expect(control("match")).not.toHaveAttribute("aria-invalid", "true");

      // inside an outer labelled Field: named by it, no false warning
      control("outer-field");
      await expect(console.warn).not.toHaveBeenCalledWith(
        expect.stringContaining("accessible name"),
      );
    },
  };
}

export const InputContract = contract("textbox", (p) => <Input {...p} />);

export const InputAreaContract = contract("textbox", (p) => <InputArea {...p} />);

// Masked by default (type="password", which has no textbox role).
export const SensitiveInputContract = contract("label", (p) => <SensitiveInput {...p} />);

export const InputGroupContract = contract("textbox", ({ "aria-label": ariaLabel, ...p }) => (
  <InputGroup {...p}>
    <InputGroup.Addon>@</InputGroup.Addon>
    <InputGroup.Input aria-label={ariaLabel} />
  </InputGroup>
));

export const SelectContract = contract("combobox", (p) => (
  <Select {...p} placeholder="Choose…" items={{ a: "A", b: "B" }} />
));

export const CheckboxContract = contract("checkbox", (p) => <Checkbox {...p} />);

export const ToggleContract = contract("switch", (p) => <Toggle {...p} />);
