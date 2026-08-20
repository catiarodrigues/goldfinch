import { cn } from "../../utils/cn";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Field, normalizeFieldError, type FieldErrorMatch } from "../field/field";
import {
  GOLDFINCH_INPUT_VARIANTS,
  GOLDFINCH_INPUT_DEFAULT_VARIANTS,
  inputVariants,
  type GoldfinchInputSize,
  type GoldfinchInputVariant,
  type GoldfinchInputVariantsProps,
} from "./input-variants";

// Re-exported so existing `../input/input` imports keep working — the variant
// config lives in ./input-variants to avoid a circular import with
// sensitive-input.tsx (which also needs it and is imported by this file).
export {
  GOLDFINCH_INPUT_VARIANTS,
  GOLDFINCH_INPUT_DEFAULT_VARIANTS,
  inputVariants,
  type GoldfinchInputSize,
  type GoldfinchInputVariant,
  type GoldfinchInputVariantsProps,
};

// Omit native `size` attribute (number) to avoid conflict with our custom `size` variant
type BaseInputProps = Omit<ComponentPropsWithoutRef<typeof BaseInput>, "size">;

const InputRoot = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    size = "base",
    variant: variantProp,
    label,
    labelTooltip,
    description,
    error,
    passwordManagerIgnore = false,
    ...inputProps
  } = props;

  // Deprecation warning for variant="error"
  if (process.env.NODE_ENV !== "production" && variantProp === "error") {
    console.warn(
      '[Goldfinch Input]: variant="error" is deprecated. ' +
        "Error styling is now automatically applied when the `error` prop is truthy. " +
        "Simply remove the variant prop and pass an error message instead.",
    );
  }

  // Auto-apply error styling when error prop is truthy
  // Explicit variant prop takes precedence for backwards compatibility
  const variant = variantProp ?? (error ? "error" : "default");

  // Extract required from inputProps to pass to Field for label decoration
  const { required } = inputProps;

  // A11y enforcement: warn in dev if no accessible name provided
  if (process.env.NODE_ENV !== "production") {
    const hasLabel = Boolean(label);
    const hasAriaLabel = Boolean(inputProps["aria-label"]);
    const hasAriaLabelledBy = Boolean(inputProps["aria-labelledby"]);

    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      console.warn(
        "[Goldfinch Input]: Input must have an accessible name. Provide either:\n" +
          "  - label prop: <Input label='Email' />\n" +
          "  - aria-label: <Input aria-label='Email address' />\n" +
          "  - aria-labelledby for custom label association",
      );
    }
  }

  const input = (
    <BaseInput
      ref={ref}
      className={cn(
        inputVariants({ size, variant, focusIndicator: true }),
        passwordManagerIgnore && "keeper-ignore",
        className,
      )}
      {...(passwordManagerIgnore
        ? {
            "data-1p-ignore": "true",
            "data-bwignore": "true",
            "data-form-type": "other",
            "data-lpignore": "true",
          }
        : {})}
      {...inputProps}
    />
  );

  // Render with Field wrapper if label, error, or description is provided
  if (label || error || description) {
    return (
      <Field
        label={label}
        required={required}
        labelTooltip={labelTooltip}
        description={description}
        error={normalizeFieldError(error)}
      >
        {input}
      </Field>
    );
  }

  // Render bare input without Field wrapper
  return input;
});

InputRoot.displayName = "Input";

// `Input.Group` / `Input.Sensitive` are attached in ./index.ts, not here —
// InputGroup and SensitiveInput both import this module's variant config, so
// this module can't also import them at module scope without a cycle.
export const Input = InputRoot;

/**
 * Input component props with accessibility guidance.
 *
 * **Accessible Name Required:** Input should have one of:
 * 1. `label` prop (recommended) - enables Field wrapper with label/description/error
 * 2. `placeholder` + `aria-label` - for bare inputs with visual placeholder
 * 3. `aria-labelledby` - for custom label association
 *
 * Missing accessible names will trigger console warnings in development.
 *
 * @example
 * // Recommended: Built-in Field wrapper
 * <Input label="Email" placeholder="you@example.com" />
 *
 * @example
 * // Bare input with placeholder and aria-label
 * <Input placeholder="Search..." aria-label="Search products" />
 *
 * @example
 * // Custom label association
 * <label id="email-label">Email</label>
 * <Input aria-labelledby="email-label" />
 *
 * @example
 * // With description and error
 * <Input
 *   label="Password"
 *   description="Must be at least 8 characters"
 *   error="Password is too short"
 * />
 */
export type InputProps = Pick<GoldfinchInputVariantsProps, "size" | "variant"> &
  BaseInputProps & {
    /** Label content for the input (enables Field wrapper) - can be a string or any React node */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the input */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | { message: ReactNode; match: FieldErrorMatch };
    /** Suppress browser extension password manager overlays on non-credential inputs. */
    passwordManagerIgnore?: boolean;
  };
