import { forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

export const GOLDFINCH_PAGE_VARIANTS = {
  size: {
    sm: {
      classes: "max-w-3xl",
      description: "Narrow page width (48rem)",
    },
    base: {
      classes: "max-w-5xl",
      description: "Default page width (64rem)",
    },
    lg: {
      classes: "max-w-7xl",
      description: "Wide page width (80rem)",
    },
    full: {
      classes: "max-w-none",
      description: "Full width, no max-width constraint",
    },
  },
} as const;

export const GOLDFINCH_PAGE_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type GoldfinchPageSize = keyof typeof GOLDFINCH_PAGE_VARIANTS.size;

export interface GoldfinchPageVariantsProps {
  size?: GoldfinchPageSize;
}

export function pageVariants({
  size = GOLDFINCH_PAGE_DEFAULT_VARIANTS.size,
}: GoldfinchPageVariantsProps = {}) {
  return cn(
    "mx-auto w-full px-4 sm:px-6 lg:px-8 py-6",
    resolveVariant(GOLDFINCH_PAGE_VARIANTS.size, size, GOLDFINCH_PAGE_DEFAULT_VARIANTS.size).classes,
  );
}

export interface PageRootProps extends GoldfinchPageVariantsProps {
  children: ReactNode;
  className?: string;
}

const PageRoot = forwardRef<HTMLDivElement, PageRootProps>(function Page(
  { size = "base", children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(pageVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

export interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={cn("text-2xl font-semibold tracking-tight text-goldfinch-strong", className)}>
      {children}
    </h1>
  );
}

export interface PageDescriptionProps {
  children: ReactNode;
  className?: string;
}

function PageDescription({ children, className }: PageDescriptionProps) {
  return (
    <p className={cn("text-sm text-goldfinch-subtle", className)}>
      {children}
    </p>
  );
}

export interface PageBreadcrumbsProps {
  children: ReactNode;
  className?: string;
}

function PageBreadcrumbs({ children, className }: PageBreadcrumbsProps) {
  return (
    <div className={cn("mb-1 text-xs text-goldfinch-subtle", className)}>
      {children}
    </div>
  );
}

PageRoot.displayName = "Page";
PageTitle.displayName = "Page.Title";
PageDescription.displayName = "Page.Description";
PageBreadcrumbs.displayName = "Page.Breadcrumbs";

type PageComponent = typeof PageRoot & {
  Title: typeof PageTitle;
  Description: typeof PageDescription;
  Breadcrumbs: typeof PageBreadcrumbs;
};

const Page = Object.assign(PageRoot, {
  Title: PageTitle,
  Description: PageDescription,
  Breadcrumbs: PageBreadcrumbs,
}) as PageComponent;

export { Page };
