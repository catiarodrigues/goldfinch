import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

/** Base styles applied to all badge variants. */
export const GOLDFINCH_BADGE_BASE_STYLES =
  "inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap";

/** Badge variant definitions mapping variant names to their Tailwind classes and descriptions. */
export const GOLDFINCH_BADGE_VARIANTS = {
  variant: {
    /** Semantic token badges */
    primary: {
      classes: "bg-goldfinch-badge-inverted text-goldfinch-badge-inverted",
      description: "Primary badge",
    },
    secondary: {
      classes: "bg-goldfinch-fill text-goldfinch-badge-neutral-subtle",
      description: "Secondary badge",
    },
    error: {
      classes: "bg-goldfinch-danger-tint/60 text-goldfinch-danger",
      description: "Error badge",
    },
    warning: {
      classes: "bg-goldfinch-warning-tint/70 text-goldfinch-warning",
      description: "Warning badge",
    },
    success: {
      classes: "bg-goldfinch-success-tint/70 text-goldfinch-success",
      description: "Success badge",
    },
    destructive: {
      classes: "bg-goldfinch-badge-red text-white",
      description: "Deprecated. Use red instead.",
    },
    info: {
      classes: "bg-goldfinch-info-tint/70 text-goldfinch-info",
      description: "Info badge",
    },
    beta: {
      classes:
        "border border-dashed border-goldfinch-brand bg-transparent text-goldfinch-link",
      description: "Indicates beta or experimental features",
    },
    outline: {
      classes: "border border-goldfinch-fill bg-transparent text-goldfinch-default",
      description: "Bordered badge with transparent background",
    },

    /** Other color token variants */

    red: {
      classes: "bg-goldfinch-badge-red text-white",
      description: "Red badge",
    },
    green: {
      classes: "bg-goldfinch-badge-green text-white",
      description: "Green badge",
    },
    neutral: {
      classes: "bg-goldfinch-badge-neutral text-white",
      description: "Neutral badge",
    },
    orange: {
      classes: "bg-goldfinch-badge-orange text-black",
      description: "Orange badge",
    },
    purple: {
      classes: "bg-goldfinch-badge-purple text-white",
      description: "Purple badge",
    },
    teal: {
      classes: "bg-goldfinch-badge-teal text-white",
      description: "Teal badge",
    },
    "teal-subtle": {
      classes: "bg-goldfinch-badge-teal-subtle text-goldfinch-badge-teal-subtle",
      description: "Subtle teal badge",
    },
    blue: {
      classes: "bg-goldfinch-badge-blue text-white",
      description: "Blue badge",
    },
  },
  appearance: {
    filled: {
      classes: "",
      description: "Filled badge with background color (default)",
    },
    dot: {
      classes:
        "gap-1.5 bg-transparent text-goldfinch-default ring ring-goldfinch-hairline",
      description: "Outlined badge with a colored circle dot indicating status",
    },
  },
  dotColor: {
    none: {
      classes: "",
      description: "No dot indicator (used when appearance is not dot, or variant has no dot color)",
    },
    success: {
      classes: "bg-goldfinch-success",
      description: "Green dot for success status",
    },
    warning: {
      classes: "bg-goldfinch-badge-orange",
      description: "Orange dot for warning status",
    },
    error: {
      classes: "bg-goldfinch-badge-red",
      description: "Red dot for error status",
    },
    neutral: {
      classes: "bg-goldfinch-badge-neutral",
      description: "Neutral dot for informational status",
    },
  },
} as const;

export const GOLDFINCH_BADGE_DEFAULT_VARIANTS = {
  variant: "primary",
  appearance: "filled",
  dotColor: "none",
} as const;

// Derived types from GOLDFINCH_BADGE_VARIANTS
export type GoldfinchBadgeVariant = keyof typeof GOLDFINCH_BADGE_VARIANTS.variant;
export type GoldfinchBadgeAppearance = keyof typeof GOLDFINCH_BADGE_VARIANTS.appearance;
export type GoldfinchBadgeDotColor = keyof typeof GOLDFINCH_BADGE_VARIANTS.dotColor;

export interface GoldfinchBadgeVariantsProps {
  variant?: GoldfinchBadgeVariant;
  appearance?: GoldfinchBadgeAppearance;
}

export function badgeVariants({
  variant = GOLDFINCH_BADGE_DEFAULT_VARIANTS.variant,
  appearance = GOLDFINCH_BADGE_DEFAULT_VARIANTS.appearance,
}: GoldfinchBadgeVariantsProps = {}) {
  const variantClasses = resolveVariant(
    GOLDFINCH_BADGE_VARIANTS.variant,
    variant,
    GOLDFINCH_BADGE_DEFAULT_VARIANTS.variant,
  ).classes;
  const appearanceClasses = resolveVariant(
    GOLDFINCH_BADGE_VARIANTS.appearance,
    appearance,
    GOLDFINCH_BADGE_DEFAULT_VARIANTS.appearance,
  ).classes;
  return cn(
    // Base styles (exported as GOLDFINCH_BADGE_BASE_STYLES for Figma plugin)
    GOLDFINCH_BADGE_BASE_STYLES,
    // The dot appearance overrides background/text colors from the variant,
    // so only apply variant classes when we're not in dot mode.
    appearance === "dot" ? "" : variantClasses,
    appearanceClasses,
  );
}

// Legacy type alias for backwards compatibility
export type BadgeVariant = GoldfinchBadgeVariant;

/**
 * Badge component props.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * <Badge variant="red">Error</Badge>
 * <Badge variant="neutral">Inactive</Badge>
 * <Badge variant="success" appearance="dot">Healthy</Badge>
 * ```
 */
export interface BadgeProps {
  /**
   * Color variant of the badge.
   * Recommended semantic variants:
   * - `"primary"` — Primary badge
   * - `"secondary"` — Secondary badge
   * - `"error"` — Error badge
   * - `"warning"` — Warning badge
   * - `"success"` — Success badge
   * - `"info"` — Info badge
   *
   * Additional token variants:
   * - `"red"`, `"orange"`, `"green"`, `"teal"`, `"blue"`, `"purple"`, `"neutral"`
   * - `"teal-subtle"`, `"neutral-subtle"`
   * - `"inverted"`
   * - `"outline"` — Bordered badge with transparent background
   * - `"beta"` — Dashed-border badge for beta/experimental features
   * @default "primary"
   */
  variant?: GoldfinchBadgeVariant;
  /**
   * Visual appearance of the badge.
   * - `"filled"` — Filled background using the variant color (default)
   * - `"dot"` — Outlined badge with a colored circle dot. Only `success`,
   *   `warning`, `error`, and `neutral` variants show a dot; other variants
   *   render the badge without a dot.
   * @default "filled"
   */
  appearance?: GoldfinchBadgeAppearance;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Content rendered inside the badge. */
  children: ReactNode;
}

/**
 * Small status label for categorizing or highlighting content.
 *
 * @example
 * ```tsx
 * <Badge variant="green">Active</Badge>
 * <Badge variant="success" appearance="dot">Healthy</Badge>
 * ```
 */
export function Badge({
  variant = GOLDFINCH_BADGE_DEFAULT_VARIANTS.variant,
  appearance = GOLDFINCH_BADGE_DEFAULT_VARIANTS.appearance,
  className,
  children,
}: BadgeProps) {
  // Crash-safe dot-color lookup via resolveVariant — unknown variants fall
  // back to "none" (no dot) instead of throwing.
  const dotColor =
    appearance === "dot"
      ? resolveVariant(
          GOLDFINCH_BADGE_VARIANTS.dotColor,
          variant,
          GOLDFINCH_BADGE_DEFAULT_VARIANTS.dotColor,
        ).classes
      : "";

  return (
    <span className={cn(badgeVariants({ variant, appearance }), className)}>
      {dotColor ? (
        <span
          aria-hidden="true"
          className={cn("size-1.75 rounded-full shrink-0", dotColor)}
        />
      ) : null}
      {children}
    </span>
  );
}
