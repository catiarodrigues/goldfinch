import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../../utils/cn";

const CARD_SURFACE_CLASSES =
  "overflow-hidden rounded-lg bg-goldfinch-base shadow-xs ring ring-goldfinch-line";
const CARD_LAYERED_ROOT_CLASSES =
  "flex w-full flex-col overflow-hidden rounded-lg bg-goldfinch-elevated text-base ring ring-goldfinch-hairline";
const CARD_SECONDARY_CLASSES =
  "-my-2 flex items-center gap-2 bg-goldfinch-elevated p-4 text-base font-medium text-goldfinch-subtle";
const CARD_PRIMARY_CLASSES =
  "relative flex flex-col gap-2 overflow-hidden rounded-lg bg-goldfinch-base p-4 pr-3 text-inherit no-underline ring ring-goldfinch-fill";

/** Card variant definitions (currently empty, reserved for future additions). */
export const GOLDFINCH_CARD_VARIANTS = {

} as const;

export const GOLDFINCH_CARD_DEFAULT_VARIANTS = {} as const;

export interface GoldfinchCardVariantsProps {}

export function cardVariants(_props: GoldfinchCardVariantsProps = {}) {
  return cn(CARD_SURFACE_CLASSES);
}

function hasCardSections(children: ReactNode): boolean {
  return Children.toArray(children).some((child): boolean => {
    if (!isValidElement(child)) {
      return false;
    }

    if (child.type === CardPrimary || child.type === CardSecondary) {
      return true;
    }

    if (child.type === Fragment) {
      const fragmentChild = child as ReactElement<{ children?: ReactNode }>;
      return hasCardSections(fragmentChild.props.children);
    }

    return false;
  });
}

export type CardProps = useRender.ComponentProps<"div"> &
  GoldfinchCardVariantsProps;

export type CardSectionProps = ComponentPropsWithoutRef<"div">;

/**
 * Card container for both simple surfaces and layered layouts.
 *
 * Render children directly for a single-surface card, or use
 * `Card.Secondary` and `Card.Primary` for the layered card treatment.
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, render, ...props },
  ref,
) {
  const hasStructuredLayers = hasCardSections(children);

  const defaultProps: useRender.ElementProps<"div"> = {
    className: cn(
      hasStructuredLayers ? CARD_LAYERED_ROOT_CLASSES : cardVariants(),
      className,
    ),
  };

  return useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps<"div">(defaultProps, props, { children }),
  });
});

function CardSecondary({
  children,
  className,
  ...props
}: CardSectionProps) {
  return <div className={cn(CARD_SECONDARY_CLASSES, className)} {...props}>{children}</div>;
}

function CardPrimary({ children, className, ...props }: CardSectionProps) {
  return <div className={cn(CARD_PRIMARY_CLASSES, className)} {...props}>{children}</div>;
}

CardRoot.displayName = "Card";
CardSecondary.displayName = "Card.Secondary";
CardPrimary.displayName = "Card.Primary";

type CardComponent = typeof CardRoot & {
  Primary: typeof CardPrimary;
  Secondary: typeof CardSecondary;
};

const Card = Object.assign(CardRoot, {
  Primary: CardPrimary,
  Secondary: CardSecondary,
}) as CardComponent;

export { Card };
