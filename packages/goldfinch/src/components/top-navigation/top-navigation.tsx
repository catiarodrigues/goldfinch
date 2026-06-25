import { forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TopNavigationProps {
  children: ReactNode;
  className?: string;
}

const TopNavigationRoot = forwardRef<HTMLElement, TopNavigationProps>(function TopNavigation(
  { children, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cn("flex h-14 items-center gap-4 border-b border-goldfinch-hairline bg-goldfinch-base px-4", className)}
      {...props}
    >
      {children}
    </header>
  );
});

export interface TopNavigationLogoProps {
  children: ReactNode;
  className?: string;
}

function TopNavigationLogo({ children, className }: TopNavigationLogoProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      {children}
    </div>
  );
}

export interface TopNavigationNavProps {
  children: ReactNode;
  className?: string;
}

function TopNavigationNav({ children, className }: TopNavigationNavProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {children}
    </nav>
  );
}

export interface TopNavigationNavItemProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

function TopNavigationNavItem({ children, active, className }: TopNavigationNavItemProps) {
  return (
    <div
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-goldfinch-tint text-goldfinch-strong"
          : "text-goldfinch-subtle hover:text-goldfinch-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface TopNavigationActionsProps {
  children: ReactNode;
  className?: string;
}

function TopNavigationActions({ children, className }: TopNavigationActionsProps) {
  return (
    <div className={cn("ml-auto flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

TopNavigationRoot.displayName = "TopNavigation";
TopNavigationLogo.displayName = "TopNavigation.Logo";
TopNavigationNav.displayName = "TopNavigation.Nav";
TopNavigationNavItem.displayName = "TopNavigation.NavItem";
TopNavigationActions.displayName = "TopNavigation.Actions";

type TopNavigationComponent = typeof TopNavigationRoot & {
  Logo: typeof TopNavigationLogo;
  Nav: typeof TopNavigationNav;
  NavItem: typeof TopNavigationNavItem;
  Actions: typeof TopNavigationActions;
};

const TopNavigation = Object.assign(TopNavigationRoot, {
  Logo: TopNavigationLogo,
  Nav: TopNavigationNav,
  NavItem: TopNavigationNavItem,
  Actions: TopNavigationActions,
}) as TopNavigationComponent;

export { TopNavigation };
