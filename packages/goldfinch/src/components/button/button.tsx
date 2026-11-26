import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
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
  /** Shows a spinner and disables the button while an action runs. */
  loading?: boolean;
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
  const content = icon ? (
    <span className="inline-flex items-center gap-1.5">
      {icon}
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
        "disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants({ variant, size, shape }),
        className,
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {content}
    </BaseButton>
  );
}

// Matched by name in buttonChildAsRender (utils/button-trigger.ts).
Button.displayName = "Button";
