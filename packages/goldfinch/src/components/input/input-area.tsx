import { inputVariants } from "./input-variants";
import { cn } from "../../utils/cn";
import { useCallback, type ReactNode } from "react";
import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import {
  Field,
  useAccessibleNameWarning,
  type FieldErrorProp,
} from "../field/field";

export const InputArea = React.forwardRef<HTMLTextAreaElement, InputAreaProps>(
  (props, ref) => {
    const {
      className,
      onValueChange,
      size = "base",
      variant,
      onChange,
      label,
      labelTooltip,
      description,
      error,
      ...inputProps
    } = props;

    // Deprecation warning for variant="error"
    if (process.env.NODE_ENV !== "production" && variant === "error") {
      console.warn(
        '[Goldfinch InputArea]: variant="error" is deprecated. ' +
          "Error styling is now automatically applied when the `error` prop is truthy. " +
          "Simply remove the variant prop and pass an error message instead.",
      );
    }

    // Extract required from inputProps to pass to Field for label decoration
    const { required } = inputProps;

    useAccessibleNameWarning("InputArea", { label, ...inputProps });

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
        onValueChange?.(event.target.value);
      },
      [onChange, onValueChange],
    );

    // Base UI's Input rendered as a <textarea>: it merges its own field
    // wiring (id, aria-*, validity tracking, data-invalid) with ours instead of
    // either side overwriting the other.
    const textarea = (
      <BaseInput
        ref={ref as React.Ref<HTMLInputElement>}
        render={<textarea />}
        className={cn(
          "w-full",
          inputVariants({ size, variant, focusIndicator: true }),
          "h-auto py-2", // Input variant always comes with size, but it does not apply for textarea
          className,
        )}
        onChange={
          handleChange as unknown as React.ChangeEventHandler<HTMLInputElement>
        }
        {...(inputProps as Omit<
          React.ComponentPropsWithoutRef<typeof BaseInput>,
          "size"
        >)}
      />
    );

    // Field decides whether there's anything to wrap, and owns invalid state.
    return (
      <Field
        label={label}
        required={required}
        labelTooltip={labelTooltip}
        description={description}
        error={error}
      >
        {textarea}
      </Field>
    );
  },
);

InputArea.displayName = "InputArea";

/** Alias for InputArea — provided for discoverability when migrating from other libraries */
export const Textarea = InputArea;

/**
 * InputArea component props
 * @property {ReactNode} [label] - Label content for the textarea (enables Field wrapper)
 * @property {ReactNode} [description] - Helper text displayed below the textarea
 * @property {string | { message: ReactNode, match: FieldErrorMatch }} [error] - Error message or validation error object
 */
export type InputAreaProps = {
  onValueChange?: (value: string) => void;
  variant?: "default" | "error";
  size?: "xs" | "sm" | "base" | "lg";
  // Then other custom props
  children?: React.ReactNode;
  className?: string;
  /** Label content for the textarea (enables Field wrapper) - can be a string or any React node */
  label?: ReactNode;
  /** Tooltip content to display next to the label via an info icon */
  labelTooltip?: ReactNode;
  /** Helper text displayed below the textarea */
  description?: ReactNode;
  /** Error message or validation error object */
  error?: FieldErrorProp;

  // Finally, spread the native input props (least important)
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;
