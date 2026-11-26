import { ListIcon, XIcon } from "@phosphor-icons/react";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { useLinkComponent } from "../../utils/link-provider";
import { Button } from "../button/button";

export interface TopNavigationProps {
  /** `TopNavigation.Logo`, `.Nav` and `.Actions`. */
  children: ReactNode;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
}

/**
 * The header is a size container: below 42rem of its own width the nav
 * collapses into a Menu button, whatever the size of the window.
 */
const TopNavigationRoot = forwardRef<HTMLElement, TopNavigationProps>(
  function TopNavigation({ children, className, ...props }, ref) {
    return (
      <header
        ref={ref}
        className={cn(
          "@container relative border-b border-goldfinch-hairline bg-goldfinch-base",
          className,
        )}
        {...props}
      >
        <div className="flex h-14 items-center gap-4 px-4">{children}</div>
      </header>
    );
  },
);

export interface TopNavigationLogoProps {
  children: ReactNode;
  className?: string;
}

function TopNavigationLogo({ children, className }: TopNavigationLogoProps) {
  return (
    <div
      className={cn(
        // While the nav is collapsed, push the Menu button and actions right.
        "flex shrink-0 items-center gap-2 @max-2xl:mr-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface TopNavigationNavProps {
  children: ReactNode;
  /** Accessible name for the navigation landmark. */
  label?: string;
  /** Text of the button that opens the nav on narrow headers. */
  menuLabel?: string;
  className?: string;
}

function TopNavigationNav({
  children,
  label = "Main",
  menuLabel = "Menu",
  className,
}: TopNavigationNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleId = useId();
  const panelRef = useRef<HTMLElement>(null);

  // Choosing a link closes the panel. Links fire click for Enter too, so
  // this covers keyboard users; it listens on the panel to catch every link.
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) setOpen(false);
    };
    panel.addEventListener("click", onClick);
    return () => panel.removeEventListener("click", onClick);
  }, [open]);

  // Escape closes the panel and returns focus to the Menu button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      document.getElementById(toggleId)?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, toggleId]);

  return (
    <>
      <nav
        aria-label={label}
        className={cn("hidden items-center gap-1 @2xl:flex", className)}
      >
        {children}
      </nav>

      <Button
        id={toggleId}
        variant="ghost"
        size="sm"
        icon={open ? <XIcon /> : <ListIcon />}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="@2xl:hidden"
        data-goldfinch-component="TopNavigation"
        data-goldfinch-part="menu-button"
      >
        {menuLabel}
      </Button>

      <nav
        id={panelId}
        aria-label={label}
        ref={panelRef}
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-10 flex flex-col gap-1 border-b border-goldfinch-hairline bg-goldfinch-base p-2 shadow-lg @2xl:hidden",
          !open && "hidden",
        )}
      >
        {children}
      </nav>
    </>
  );
}

export interface TopNavigationNavItemProps {
  /** The item's label. */
  children: ReactNode;
  /** Where the item links to. Rendered with the `LinkProvider` component, so router links work. */
  href?: string;
  /** Highlights the item as the current page and marks it `aria-current="page"`. */
  active?: boolean;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
}

function TopNavigationNavItem({
  children,
  href,
  active,
  className,
}: TopNavigationNavItemProps) {
  const LinkComponent = useLinkComponent();
  const classes = cn(
    "rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
    active
      ? "bg-goldfinch-tint text-goldfinch-strong"
      : "text-goldfinch-subtle hover:text-goldfinch-strong",
    className,
  );

  if (!href) return <div className={classes}>{children}</div>;

  return (
    <LinkComponent
      href={href}
      to={href}
      aria-current={active ? "page" : undefined}
      className={classes}
      data-goldfinch-component="TopNavigation"
      data-goldfinch-part="nav-item"
    >
      {children}
    </LinkComponent>
  );
}

export interface TopNavigationActionsProps {
  children: ReactNode;
  className?: string;
}

function TopNavigationActions({
  children,
  className,
}: TopNavigationActionsProps) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2 @2xl:ml-auto", className)}
    >
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
