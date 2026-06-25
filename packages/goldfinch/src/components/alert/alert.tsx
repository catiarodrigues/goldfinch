import {
  type HTMLAttributes,
  type ReactNode,
  isValidElement,
  forwardRef,
} from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

/** Base styles applied to all alert variants. */
export const GOLDFINCH_ALERT_BASE_STYLES =
  "flex w-full items-start gap-3 rounded-lg px-4 py-3 text-base";

/** Alert variant definitions mapping style options to their Tailwind classes and descriptions. */
export const GOLDFINCH_ALERT_VARIANTS = {
  variant: {
    default: {
      classes: "bg-goldfinch-banner-info text-goldfinch-info",
      iconClasses: "text-goldfinch-info",
      description: "Informational alert for general messages",
    },
    alert: {
      classes: "bg-goldfinch-banner-warning text-goldfinch-warning",
      iconClasses: "text-goldfinch-warning",
      description: "Warning alert for cautionary messages",
    },
    error: {
      classes: "bg-goldfinch-danger-tint/60 text-goldfinch-danger",
      iconClasses: "text-goldfinch-danger",
      description: "Error alert for critical issues",
    },
    secondary: {
      classes: "bg-goldfinch-contrast/5 text-goldfinch-subtle",
      iconClasses: "text-goldfinch-subtle",
      description: "Neutral alert for secondary messages",
    },
  },
} as const;

export const GOLDFINCH_ALERT_DEFAULT_VARIANTS = {
  variant: "default",
} as const;

// Derived types from GOLDFINCH_ALERT_VARIANTS
export type GoldfinchAlertVariant = keyof typeof GOLDFINCH_ALERT_VARIANTS.variant;

export interface GoldfinchAlertVariantsProps {
  /**
   * Visual style of the alert.
   * - `"default"` — Informational alert for general messages
   * - `"alert"` — Warning alert for cautionary messages
   * - `"error"` — Error alert for critical issues
   * - `"secondary"` — Neutral alert for secondary messages
   * @default "default"
   */
  variant?: GoldfinchAlertVariant;
}

export function alertVariants({
  variant = GOLDFINCH_ALERT_DEFAULT_VARIANTS.variant,
}: GoldfinchAlertVariantsProps = {}) {
  const resolvedVariant = resolveVariant(
    GOLDFINCH_ALERT_VARIANTS.variant,
    variant,
    GOLDFINCH_ALERT_DEFAULT_VARIANTS.variant,
  );

  return cn(
    // Base styles (exported as GOLDFINCH_ALERT_BASE_STYLES for Figma plugin)
    GOLDFINCH_ALERT_BASE_STYLES,
    // Apply variant styles from GOLDFINCH_ALERT_VARIANTS
    resolvedVariant.classes,
  );
}

// Legacy enum for backwards compatibility
export enum AlertVariant {
  DEFAULT,
  ALERT,
  ERROR,
}

/**
 * Alert component props.
 *
 * @example
 * ```tsx
 * <Alert title="Update available" description="A new version is ready to install." />
 * <Alert variant="alert" title="Session expiring" description="Your session will expire soon." />
 * <Alert variant="error" title="Save failed" description="We couldn't save your changes." />
 * ```
 */
export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** Icon element rendered before the alert content (e.g. from `@phosphor-icons/react`). */
  icon?: ReactNode;
  /** Primary heading text for the alert. Use for i18n string injection. */
  title?: string;
  /** Secondary description text displayed below the title. Use for i18n string injection. */
  description?: ReactNode;
  /** Action slot rendered at the trailing end of the alert (e.g. a CTA button or link). Only used in structured mode (with `title` or `description`). */
  action?: ReactNode;
  /** @deprecated Use `title` and `description` instead. Will be removed in a future major version. */
  text?: string;
  /** @deprecated Use `title` and `description` instead for better i18n support. */
  children?: ReactNode;
  /**
   * Visual style of the alert.
   * - `"default"` — Informational blue alert for general messages
   * - `"alert"` — Warning yellow alert for cautionary messages
   * - `"error"` — Error red alert for critical issues
   * - `"secondary"` — Neutral alert for secondary messages
   * @default "default"
   */
  variant?: GoldfinchAlertVariant;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
}

/**
 * Full-width message bar for informational, warning, or error notices.
 * Supports structured title/description for i18n, or simple children for basic usage.
 *
 * @example
 * ```tsx
 * // Structured (recommended for i18n)
 * <Alert
 *   variant="alert"
 *   icon={<WarningCircle />}
 *   title="Review required"
 *   description="Please review your billing information."
 * />
 *
 * // Simple (backwards compatible)
 * <Alert variant="alert" icon={<WarningCircle />}>
 *   Review your billing information.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    icon,
    title,
    description,
    action,
    children,
    text,
    variant = GOLDFINCH_ALERT_DEFAULT_VARIANTS.variant,
    className,
    ...props
  },
  ref,
) {
  const variantConfig = resolveVariant(
    GOLDFINCH_ALERT_VARIANTS.variant,
    variant,
    GOLDFINCH_ALERT_DEFAULT_VARIANTS.variant,
  );

  // Structured mode: title and/or description provided
  if (title || description) {
    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "shrink-0 flex items-center h-[1.375em]",
              variantConfig.iconClasses,
            )}
          >
            {icon}
          </span>
        )}
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center justify-between gap-3",
            !title && "pt-px",
          )}
        >
          <div className="flex flex-col gap-0.5">
            {title && <p className="font-medium leading-snug">{title}</p>}
            {description && (
              <div className="text-sm leading-snug">
                {isValidElement(description) ? (
                  description
                ) : (
                  <p>{description}</p>
                )}
              </div>
            )}
          </div>
          {action && (
            <div className="flex shrink-0 items-center gap-2">{action}</div>
          )}
        </div>
      </div>
    );
  }

  // Legacy mode: children or text prop
  const value = children ?? text;
  const content = isValidElement(value) ? value : <p>{value}</p>;

  return (
    <div
      ref={ref}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <span className={cn("shrink-0", variantConfig.iconClasses)}>
          {icon}
        </span>
      )}
      {content}
    </div>
  );
});

Alert.displayName = "Alert";
