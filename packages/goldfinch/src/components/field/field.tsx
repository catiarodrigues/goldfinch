import { Field as FieldBase } from "@base-ui/react/field";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Label } from "../label";

/**
 * Normalizes an error prop that may be a string or structured object
 * into the `{ message, match }` shape expected by `<Field>`.
 *
 * Returns `undefined` when the input is falsy.
 */
export function normalizeFieldError(
  error: FieldErrorProp | undefined,
): { message: ReactNode; match: FieldErrorMatch } | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return { message: error, match: true };
  return error;
}

/** Field variant definitions (currently empty, reserved for future additions). */
export const GOLDFINCH_FIELD_VARIANTS = {
  // Field currently has no variant options but structure is ready for future additions
} as const;

export const GOLDFINCH_FIELD_DEFAULT_VARIANTS = {} as const;

// Derived types from GOLDFINCH_FIELD_VARIANTS
export interface GoldfinchFieldVariantsProps {
  /**
   * When true, places the control (checkbox/switch) before the label visually.
   * When false (default), places the label before the control.
   * Used to support different layout patterns (e.g., iOS-style toggles on the right).
   */
  controlFirst?: boolean;
}

export function fieldVariants({
  controlFirst = false,
}: GoldfinchFieldVariantsProps = {}) {
  return cn(
    // Base styles - vertical layout (default)
    "grid gap-2",

    // Horizontal layout for checkbox and switch
    // Default: Grid auto-reverses in RTL (desired)
    "has-[input[type=checkbox]]:grid-cols-[auto_1fr] has-[input[type=checkbox]]:items-center",
    "has-[[role=switch]]:grid-cols-[auto_1fr] has-[[role=switch]]:items-center",

    // Control first: the same grid with the label moved after the control, so the
    // description and error still take their own full-width rows below. (A reversed
    // flex row put them beside the switch.) The grid still flips in RTL.
    controlFirst && "[&>label]:order-1",
  );
}

/**
 * Match type for field validation errors.
 * Can be a boolean or a key from the browser's ValidityState interface.
 * Source: BaseErrorProps["match"] (ComponentPropsWithoutRef<typeof FieldBase.Error>)
 */
export type FieldErrorMatch =
  | boolean
  | "badInput"
  | "customError"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valid"
  | "valueMissing";

/**
 * A field error: either a message that is always shown (the field is invalid
 * while it's set), or `{ message, match }` to show the message only when the
 * browser's own validation fails that `ValidityState` check.
 */
export type FieldErrorProp =
  | string
  | { message: ReactNode; match: FieldErrorMatch };

/** True inside a Field that has a label, so its control already has an accessible name. */
const FieldLabelledContext = createContext(false);

/** True when rendered inside a Field with a label (so the control is already named). */
export function useInLabelledField() {
  return useContext(FieldLabelledContext);
}

/**
 * Dev-only warning for a form control with no accessible name. Counts a
 * surrounding labelled Field (e.g. `<Field label><Input/></Field>` or a
 * labelled InputGroup), not just the control's own props.
 */
export function useAccessibleNameWarning(
  component: string,
  props: {
    label?: ReactNode;
    "aria-label"?: string;
    "aria-labelledby"?: string;
  },
) {
  const inLabelledField = useInLabelledField();
  if (
    process.env.NODE_ENV !== "production" &&
    !inLabelledField &&
    !props.label &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      `[Goldfinch ${component}]: ${component} must have an accessible name. Provide either:\n` +
        `  - label prop: <${component} label="Email" />\n` +
        `  - aria-label: <${component} aria-label="Email address" />\n` +
        "  - aria-labelledby for custom label association",
    );
  }
}

/**
 * Field component props — wraps a form control with label, description, and error message.
 *
 * @example
 * ```tsx
 * <Field label="Email" required>
 *   <Input placeholder="you@example.com" />
 * </Field>
 *
 * <Field label="Phone" required={false} description="We'll only use this for account recovery.">
 *   <Input placeholder="+1 555-0000" />
 * </Field>
 * ```
 */
export interface FieldProps extends GoldfinchFieldVariantsProps {
  /** The form control element(s) to wrap (Input, Select, Checkbox, etc.). */
  children: ReactNode;
  /** The label content — can be a string or any React node. */
  label?: ReactNode;
  /**
   * When explicitly `false`, shows gray "(optional)" text after the label.
   * When `true` or `undefined`, no indicator is shown.
   */
  required?: boolean;
  /** Tooltip content displayed next to the label via an info icon. */
  labelTooltip?: ReactNode;
  /**
   * Field error. A string (or `{ message, match: true }`) is always shown and
   * makes the field invalid; `{ message, match: "valueMissing" }` etc. shows
   * only when the browser's validation fails that check. Either way the
   * control gets `data-invalid` / `aria-invalid` exactly while it shows.
   */
  error?: FieldErrorProp;
  /** Helper text displayed below the control (hidden while an error is showing). */
  description?: ReactNode;
  /** When `true`, places the control before the label (for checkbox/switch layouts). */
  controlFirst?: boolean;
  /**
   * When `true`, Field renders layout, description, and error but skips
   * the `<label>` element. Use when the child component provides its own
   * accessible label (e.g. Select uses Base UI's `Select.Label` to avoid
   * hover/focus coupling from native `<label>`).
   * @default false
   */
  hideLabel?: boolean;
  /** Additional CSS classes for the Field root. */
  className?: string;
}

/**
 * Form field wrapper that provides a label, optional description, and error display
 * around any form control. Built on Base UI Field primitives.
 *
 * @example
 * ```tsx
 * <Field label="Username">
 *   <Input placeholder="Choose a username" />
 * </Field>
 * ```
 */
export function Field({
  children,
  label,
  required,
  labelTooltip,
  error,
  description,
  controlFirst = false,
  hideLabel = false,
  className,
}: FieldProps) {
  const fieldError = normalizeFieldError(error);

  // Nothing to surround the control with: render it bare.
  if (!label && !description && !fieldError) return <>{children}</>;

  // Show "(optional)" when required is explicitly false
  const showOptional = required === false;

  return (
    <FieldLabelledContext.Provider value={Boolean(label)}>
      <FieldBase.Root
        className={cn(
          fieldVariants({ controlFirst }),
          "group/field",
          className,
        )}
        // An always-shown error makes the field invalid; a `match` error lets
        // the browser's validity decide.
        invalid={fieldError?.match === true ? true : undefined}
      >
        {label && !hideLabel && (
          <FieldBase.Label className="m-0 text-base font-medium text-goldfinch-default select-none">
            <Label showOptional={showOptional} tooltip={labelTooltip} asContent>
              {label}
            </Label>
          </FieldBase.Label>
        )}
        {children}
        {description && (
          <FieldBase.Description
            className={cn(
              "text-sm leading-snug text-goldfinch-subtle",
              // Own full-width row below the control and label
              "order-last col-span-full",
              // Hidden while the error is showing
              fieldError && "group-data-[invalid]/field:hidden",
            )}
          >
            {description}
          </FieldBase.Description>
        )}
        {fieldError && (
          <FieldBase.Error
            className={cn(
              "text-sm leading-snug text-goldfinch-danger",
              // Own full-width row below the control and label
              "order-last col-span-full",
            )}
            match={fieldError.match}
          >
            {fieldError.message}
          </FieldBase.Error>
        )}
      </FieldBase.Root>
    </FieldLabelledContext.Provider>
  );
}
