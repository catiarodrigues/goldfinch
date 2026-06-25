import { resolveVariant } from "../../utils/resolve-variant";

/** Spinner size variant definitions mapping sizes to their pixel values. */
export const GOLDFINCH_SPINNER_VARIANTS = {
  size: {
    sm: {
      value: 16,
      description: "Small spinner for inline use",
    },
    base: {
      value: 24,
      description: "Default spinner size",
    },
    lg: {
      value: 32,
      description: "Large spinner for prominent loading states",
    },
  },
} as const;

export const GOLDFINCH_SPINNER_DEFAULT_VARIANTS = {
  size: "base",
} as const;

// Derived types from GOLDFINCH_SPINNER_VARIANTS
export type GoldfinchSpinnerSize = keyof typeof GOLDFINCH_SPINNER_VARIANTS.size;

export interface GoldfinchSpinnerVariantsProps {
  /**
   * Size of the spinner. Use a preset name or a custom pixel number.
   * - `"sm"` — 16px, small spinner for inline use
   * - `"base"` — 24px, default spinner size
   * - `"lg"` — 32px, large spinner for prominent loading states
   * @default "base"
   */
  size?: GoldfinchSpinnerSize | number;
}

export function spinnerVariants({
  size = GOLDFINCH_SPINNER_DEFAULT_VARIANTS.size,
}: GoldfinchSpinnerVariantsProps = {}): number {
  if (typeof size === "number") return size;
  return resolveVariant(GOLDFINCH_SPINNER_VARIANTS.size, size, GOLDFINCH_SPINNER_DEFAULT_VARIANTS.size).value;
}

/**
 * Spinner component props.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="sm" />
 * <Spinner size={24} />
 * ```
 */
export interface SpinnerProps {
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /**
   * Size of the spinner. Use a preset name or a custom pixel number.
   * - `"sm"` — 16px, for inline use
   * - `"base"` — 24px, default size
   * - `"lg"` — 32px, for prominent loading states
   * @default "base"
   */
  size?: GoldfinchSpinnerSize | number;
  /**
   * Accessible label for the spinner, announced by screen readers.
   * Pass a translated string for internationalization.
   * @default "Loading"
   */
  "aria-label"?: string;
}

/**
 * Animated circular spinner for indicating loading states.
 *
 * @example
 * ```tsx
 * <Spinner />
 * ```
 */
export const Spinner = ({
  className,
  size = GOLDFINCH_SPINNER_DEFAULT_VARIANTS.size,
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps) => {
  const sizeValue = spinnerVariants({ size });
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
      style={{ height: sizeValue, width: sizeValue }}
      role="status"
      aria-label={ariaLabel}
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="0 150;42 150;42 150"
          keyTimes="0;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-16;-59"
          keyTimes="0;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        opacity={0.1}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
