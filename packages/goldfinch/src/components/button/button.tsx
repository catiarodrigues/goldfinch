import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "../../utils/cn";
import type { ComponentProps, ReactNode } from "react";

export const goldfinchButtonVariants = {
  variant: {
    primary: "bg-goldfinch-brand text-goldfinch-inverse hover:bg-goldfinch-brand-hover",
    secondary: "bg-goldfinch-base text-goldfinch-default ring ring-goldfinch-line hover:bg-goldfinch-tint",
    ghost: "text-goldfinch-default hover:bg-goldfinch-tint bg-transparent",
    outline: "bg-transparent text-goldfinch-default ring ring-goldfinch-line hover:ring-goldfinch-focus/25",
    destructive: "bg-goldfinch-danger text-white",
  },
  size: {
    xs: "px-2 py-1 text-xs rounded-md",
    sm: "px-2.5 py-1 text-sm rounded-md",
    base: "px-4 py-2 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-lg",
  },
  shape: {
    base: "",
    square: "rounded-none",
  },
} as const;

export type GoldfinchButtonVariant = keyof typeof goldfinchButtonVariants.variant;
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
  return cn(
    goldfinchButtonVariants.variant[variant],
    goldfinchButtonVariants.size[size],
    shape && goldfinchButtonVariants.shape[shape],
  );
}

export type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: GoldfinchButtonVariant;
  size?: GoldfinchButtonSize;
  shape?: GoldfinchButtonShape;
  icon?: ReactNode;
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
        "inline-flex items-center justify-center font-medium select-none cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-goldfinch-focus/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        goldfinchButtonVariants.variant[variant],
        goldfinchButtonVariants.size[size],
        shape && goldfinchButtonVariants.shape[shape],
        className,
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {content}
    </BaseButton>
  );
}
