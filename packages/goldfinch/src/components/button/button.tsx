import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import { Spinner } from "../spinner/spinner";
import type { ComponentProps, ReactNode } from "react";

export const goldfinchButtonVariants = {
  variant: {
    primary:
      "bg-goldfinch-brand text-goldfinch-inverse hover:bg-goldfinch-brand-hover",
    secondary:
      "bg-goldfinch-base text-goldfinch-default ring ring-goldfinch-line hover:bg-goldfinch-tint",
    ghost: "text-goldfinch-default hover:bg-goldfinch-tint bg-transparent",
    outline:
      "bg-transparent text-goldfinch-default ring ring-goldfinch-control-edge hover:bg-goldfinch-tint",
    destructive:
      "bg-goldfinch-danger-solid text-white hover:bg-goldfinch-danger-solid/90",
  },
  // Heights and text sizes match Input, Select and Combobox at the same size,
  // so a button lines up with the field next to it.
  size: {
    xs: "h-5 px-2 text-xs rounded-md",
    sm: "h-6.5 px-2.5 text-xs rounded-md",
    base: "h-9 px-4 text-base rounded-lg",
    lg: "h-10 px-5 text-base rounded-lg",
  },
  shape: {
    base: "",
    square: "aspect-square px-0",
  },
} as const;

export type GoldfinchButtonVariant =
  keyof typeof goldfinchButtonVariants.variant;
export type GoldfinchButtonSize = keyof typeof goldfinchButtonVariants.size;
export type GoldfinchButtonShape = keyof typeof goldfinchButtonVariants.shape;

export function buttonVariants({
  variant = "secondary",
  size = "base",
  shape,
}: {
  variant?: GoldfinchButtonVariant;
  size?: GoldfinchButtonSize;
  shape?: GoldfinchButtonShape;
} = {}) {
  // resolveVariant warns in dev and falls back when a value isn't one of the
  // options, such as a typo or a value from untyped code.
  return cn(
    resolveVariant(goldfinchButtonVariants.variant, variant, "secondary"),
    resolveVariant(goldfinchButtonVariants.size, size, "base"),
    shape && resolveVariant(goldfinchButtonVariants.shape, shape, "base"),
  );
}

export type ButtonProps = ComponentProps<typeof BaseButton> & {
  /** Visual style. `secondary` is the default; use `primary` for the main action and `destructive` for actions that delete or can't be undone. */
  variant?: GoldfinchButtonVariant;
  /** Button height and padding. */
  size?: GoldfinchButtonSize;
  /** `square` makes the button as wide as it is tall, for icon-only buttons. */
  shape?: GoldfinchButtonShape;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** Shows a spinner in place of the icon and blocks clicks while an action runs. The button stays focusable and is marked busy for screen readers. */
  loading?: boolean;
};

/** Spinner size per button size, matched to the text beside it. */
const SPINNER_SIZE: Record<string, number> = {
  xs: 12,
  sm: 12,
  base: 16,
  lg: 16,
};

export function Button({
  className,
  variant = "secondary",
  size = "base",
  shape,
  icon,
  loading,
  children,
  ...props
}: ButtonProps) {
  // While loading, a spinner takes the icon's place before the label. It's
  // decoration: the button itself is marked busy for screen readers.
  const lead = loading ? (
    <span aria-hidden="true" className="inline-flex">
      <Spinner size={SPINNER_SIZE[size] ?? 16} />
    </span>
  ) : (
    icon
  );
  const content = lead ? (
    <span className="inline-flex items-center gap-1.5">
      {lead}
      {children && <span>{children}</span>}
    </span>
  ) : (
    children
  );

  return (
    <BaseButton
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
        // A loading button stays focusable, so Base UI marks it data-disabled
        // and aria-disabled instead of setting the disabled attribute.
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        buttonVariants({ variant, size, shape }),
        className,
      )}
      {...props}
      disabled={props.disabled || loading}
      // Keeps keyboard focus on the button while it loads, so someone who
      // pressed Enter isn't sent back to the top of the page.
      focusableWhenDisabled={loading || props.focusableWhenDisabled}
      aria-busy={loading || undefined}
    >
      {content}
    </BaseButton>
  );
}

// Matched by name in buttonChildAsRender (utils/button-trigger.ts).
Button.displayName = "Button";
