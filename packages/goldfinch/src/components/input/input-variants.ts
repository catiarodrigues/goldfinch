import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

/** Input size and variant definitions mapping names to their Tailwind classes. */
export const GOLDFINCH_INPUT_VARIANTS = {
  size: {
    xs: {
      classes: "h-5 gap-1 rounded-sm px-1.5 text-xs",
      description: "Extra small input for compact UIs",
    },
    sm: {
      classes: "h-6.5 gap-1 rounded-md px-2 text-xs",
      description: "Small input for secondary fields",
    },
    base: {
      classes: "h-9 gap-1.5 rounded-lg px-3 text-base",
      description: "Default input size",
    },
    lg: {
      classes: "h-10 gap-2 rounded-lg px-4 text-base",
      description: "Large input for prominent fields",
    },
  },
  variant: {
    default: {
      classes: "focus:ring-2 focus:ring-goldfinch-focus",
      description: "Default input appearance",
    },
    error: {
      classes:
        "!ring-goldfinch-danger focus:ring-2 focus:ring-goldfinch-danger",
      description: "Error state for validation failures",
    },
  },
} as const;

export const GOLDFINCH_INPUT_DEFAULT_VARIANTS = {
  size: "base",
  variant: "default",
} as const;

// Derived types from GOLDFINCH_INPUT_VARIANTS
export type GoldfinchInputSize = keyof typeof GOLDFINCH_INPUT_VARIANTS.size;
export type GoldfinchInputVariant =
  keyof typeof GOLDFINCH_INPUT_VARIANTS.variant;

export interface GoldfinchInputVariantsProps {
  /**
   * Input size.
   * - `"xs"` — Extra small for compact UIs
   * - `"sm"` — Small for secondary fields
   * - `"base"` — Default size
   * - `"lg"` — Large for prominent fields
   * @default "base"
   */
  size?: GoldfinchInputSize;
  /**
   * Visual variant.
   * - `"default"` — Standard input
   * - `"error"` — @deprecated: forces error styling. Pass `error` instead;
   *   invalid styling then follows the field error automatically.
   * @default "default"
   */
  variant?: GoldfinchInputVariant;
  parentFocusIndicator?: boolean;
  focusIndicator?: boolean;
}

export function inputVariants({
  variant = GOLDFINCH_INPUT_DEFAULT_VARIANTS.variant,
  size = GOLDFINCH_INPUT_DEFAULT_VARIANTS.size,
  parentFocusIndicator = false,
  focusIndicator = false,
}: GoldfinchInputVariantsProps = {}) {
  return cn(
    // Base styles
    "border-0 bg-goldfinch-control text-goldfinch-default ring ring-goldfinch-control-edge outline-none focus:outline-none",
    // Disabled state and placeholder styles (using vanilla CSS class for Chrome compatibility)
    "goldfinch-input-placeholder disabled:text-goldfinch-disabled",
    // Invalid state comes from Field (Base UI sets data-invalid on the control
    // exactly while its field error shows) — never from reading `error` here.
    "data-[invalid]:ring-goldfinch-danger",
    // Apply size styles from GOLDFINCH_INPUT_VARIANTS
    resolveVariant(
      GOLDFINCH_INPUT_VARIANTS.size,
      size,
      GOLDFINCH_INPUT_DEFAULT_VARIANTS.size,
    ).classes,
    // Apply variant styles from GOLDFINCH_INPUT_VARIANTS
    resolveVariant(
      GOLDFINCH_INPUT_VARIANTS.variant,
      variant,
      GOLDFINCH_INPUT_DEFAULT_VARIANTS.variant,
    ).classes,
    // Focus state handling
    parentFocusIndicator &&
      (variant === "error"
        ? "focus-within:ring-2 focus-within:ring-goldfinch-danger"
        : [
            "focus-within:ring-2 focus-within:ring-goldfinch-focus",
            // Container whose inner control is invalid
            "has-[[data-invalid]]:ring-goldfinch-danger has-[[data-invalid]]:focus-within:ring-goldfinch-danger",
          ]),
    focusIndicator &&
      (variant === "error"
        ? "focus:ring-2 focus:ring-goldfinch-danger"
        : "focus:ring-2 focus:ring-goldfinch-focus data-[invalid]:focus:ring-goldfinch-danger"),
  );
}
