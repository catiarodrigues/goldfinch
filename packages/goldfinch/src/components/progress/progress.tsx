import { Meter as BaseMeter } from "@base-ui/react/meter";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

/** Progress variant definitions (currently empty, reserved for future additions). */
export const GOLDFINCH_PROGRESS_VARIANTS = {
  // Progress currently has no variant options but structure is ready for future additions
} as const;

export const GOLDFINCH_PROGRESS_DEFAULT_VARIANTS = {} as const;

// Derived types from GOLDFINCH_PROGRESS_VARIANTS
export interface GoldfinchProgressVariantsProps {}

export function progressVariants(_props: GoldfinchProgressVariantsProps = {}) {
  return cn(
    // Base styles
    "flex w-full flex-col gap-2",
  );
}

type RootProps = ComponentPropsWithoutRef<typeof BaseMeter.Root>;

/**
 * Progress component props.
 *
 * @example
 * ```tsx
 * <Progress label="Storage used" value={65} />
 * <Progress label="API requests" value={75} customValue="750 / 1,000" />
 * ```
 */
export interface ProgressProps extends RootProps, GoldfinchProgressVariantsProps {
  /** Custom formatted value text (e.g. "750 / 1,000") displayed instead of percentage. */
  customValue?: string;
  /** Label text displayed above the progress track. */
  label: string;
  /**
   * Whether to display the percentage value next to the label.
   * @default true
   */
  showValue?: boolean;
  /** Additional CSS classes for the track (background bar). */
  trackClassName?: string;
  /** Additional CSS classes for the indicator (filled bar). */
  indicatorClassName?: string;
}

/**
 * Progress bar showing a measured value within a known range (e.g. quota usage).
 *
 * @example
 * ```tsx
 * <Progress label="Storage" value={65} />
 * ```
 */
export function Progress({
  value,
  customValue,
  label,
  showValue = true,
  className,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <BaseMeter.Root
      value={value}
      {...props}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <div className="flex items-center justify-between gap-4">
        <BaseMeter.Label className="text-xs text-goldfinch-subtle">
          {label}
        </BaseMeter.Label>
        {customValue ? (
          <span className="text-sm font-medium text-goldfinch-default tabular-nums">
            {customValue}
          </span>
        ) : (
          <>
            {showValue && (
              <BaseMeter.Value className="text-sm font-medium text-goldfinch-default tabular-nums" />
            )}
          </>
        )}
      </div>
      <BaseMeter.Track
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-goldfinch-fill",
          trackClassName,
        )}
      >
        <BaseMeter.Indicator
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-goldfinch-brand via-goldfinch-brand to-goldfinch-brand transition-[width] duration-300 ease-out",
            indicatorClassName,
          )}
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
