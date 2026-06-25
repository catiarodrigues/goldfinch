import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Dialog as DialogBase } from "@base-ui/react/dialog";
import { AlertDialog as AlertDialogBase } from "@base-ui/react/alert-dialog";
import { Card } from "../card";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import {
  usePortalContainer,
  type PortalContainer,
} from "../../utils/portal-provider";

/** Modal size variant definitions mapping sizes to their minimum widths. */
export const GOLDFINCH_MODAL_VARIANTS = {
  size: {
    base: {
      classes: "sm:min-w-96",
      description: "Default modal width",
    },
    sm: {
      classes: "min-w-72",
      description: "Small modal for simple confirmations",
    },
    lg: {
      classes: "min-w-[32rem]",
      description: "Large modal for complex content",
    },
    xl: {
      classes: "min-w-[48rem]",
      description: "Extra large modal for detailed views",
    },
  },
  role: {
    dialog: {
      classes: "",
      description: "Standard modal for general-purpose modals",
    },
    alertdialog: {
      classes: "",
      description:
        "Alert modal for confirmation flows requiring explicit user acknowledgment",
    },
  },
} as const;

export const GOLDFINCH_MODAL_DEFAULT_VARIANTS = {
  size: "base",
  role: "dialog",
} as const;

export const GOLDFINCH_MODAL_STYLING = {
  dimensions: {
    sm: {
      width: 350,
      titleSize: 20,
      descSize: 16,
      padding: 16,
      gap: 8,
      buttonSize: "sm",
    },
    base: {
      width: 384,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
    lg: {
      width: 512,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
    xl: {
      width: 768,
      titleSize: 20,
      descSize: 16,
      padding: 24,
      gap: 16,
      buttonSize: "base",
    },
  },
  baseTokens: {
    background: "color-surface",
    text: "text-color-surface",
    borderRadius: 12,
    shadow: "shadow-m",
  },
  backdrop: {
    background: "color-surface-secondary",
    opacity: 0.8,
  },
  header: {
    title: { fontWeight: 600, color: "text-color-surface" },
    closeIcon: { name: "ph-x", size: 20, color: "text-color-muted" },
  },
  description: {
    fontWeight: 400,
    color: "text-color-muted",
  },
  buttons: {
    primary: { background: "color-primary", text: "white" },
    secondary: { ring: "color-border", text: "text-color-surface" },
  },
} as const;

// Derived types from GOLDFINCH_MODAL_VARIANTS
export type GoldfinchModalSize = keyof typeof GOLDFINCH_MODAL_VARIANTS.size;
export type GoldfinchModalRole = keyof typeof GOLDFINCH_MODAL_VARIANTS.role;

export interface GoldfinchModalVariantsProps {
  /**
   * Modal width.
   * - `"sm"` — Small (min 288px) for simple confirmations
   * - `"base"` — Default (min 384px)
   * - `"lg"` — Large (min 512px) for complex content
   * - `"xl"` — Extra large (min 768px) for detailed views
   * @default "base"
   */
  size?: GoldfinchModalSize;
}

// Modal Role Context

const ModalRoleContext = createContext<GoldfinchModalRole>("dialog");

function useModalRole() {
  return useContext(ModalRoleContext);
}

export function modalVariants({
  size = GOLDFINCH_MODAL_DEFAULT_VARIANTS.size,
}: GoldfinchModalVariantsProps = {}) {
  return cn(
    // Base styles
    "shadow-m ring ring-goldfinch-line fixed top-1/2 left-1/2 w-full sm:w-auto max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-goldfinch-base text-goldfinch-default p-6 duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
    // Apply size from GOLDFINCH_MODAL_VARIANTS
    resolveVariant(GOLDFINCH_MODAL_VARIANTS.size, size, GOLDFINCH_MODAL_DEFAULT_VARIANTS.size).classes,
  );
}

/**
 * Modal component props — the modal content panel.
 */
export type ModalProps = GoldfinchModalVariantsProps & {
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Modal content (typically Title, Description, Close, and action buttons). */
  children: ReactNode;
  /** Inline styles. */
  style?: CSSProperties;
  /**
   * Container element for the portal. Use this to render the modal inside
   * a Shadow DOM or custom container. Overrides `GoldfinchPortalProvider` context.
   * @default document.body (or GoldfinchPortalProvider container if set)
   */
  container?: PortalContainer;
};

/**
 * Modal overlay with backdrop. Compound component with `Modal.Root`,
 * `Modal.Trigger`, `Modal.Title`, `Modal.Description`, and `Modal.Close`.
 */
function ModalContent({
  className,
  children,
  style,
  size = GOLDFINCH_MODAL_DEFAULT_VARIANTS.size,
  container: containerProp,
}: ModalProps) {
  const role = useModalRole();
  const contextContainer = usePortalContainer();
  const container = containerProp ?? contextContainer ?? undefined;

  const BasePortal =
    role === "alertdialog" ? AlertDialogBase.Portal : DialogBase.Portal;
  const BaseBackdrop =
    role === "alertdialog" ? AlertDialogBase.Backdrop : DialogBase.Backdrop;
  const BasePopup =
    role === "alertdialog" ? AlertDialogBase.Popup : DialogBase.Popup;

  return (
    <BasePortal container={container}>
      <BaseBackdrop className="fixed inset-0 bg-goldfinch-recessed opacity-80 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <Card
        render={<BasePopup />}
        className={cn(modalVariants({ size }), className)}
        style={
          {
            transitionProperty: "scale, opacity",
            transitionTimingFunction:
              "var(--default-transition-timing-function)",
            "--tw-shadow":
              "0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
            ...style,
          } as CSSProperties
        }
      >
        {children}
      </Card>
    </BasePortal>
  );
}

// Modal Root

type BaseModalRootProps = ComponentPropsWithoutRef<typeof DialogBase.Root>;
type BaseAlertModalRootProps = ComponentPropsWithoutRef<
  typeof AlertDialogBase.Root
>;

type StandardModalRootProps = BaseModalRootProps & {
  /**
   * The ARIA role for the modal.
   * - `"dialog"` — Standard modal for general-purpose modals. Dismissible via outside click by default.
   * - `"alertdialog"` — Alert modal for destructive or confirmation flows. Not dismissible via outside click.
   *
   * Use `role="alertdialog"` for:
   * - Destructive actions (delete, discard, remove)
   * - Confirmation dialogs requiring explicit user acknowledgment
   * - Actions that cannot be undone
   *
   * @default "dialog"
   */
  role?: "dialog";
};

type AlertModalRootProps = BaseAlertModalRootProps & {
  role: "alertdialog";
};

export type ModalRootProps = StandardModalRootProps | AlertModalRootProps;

function ModalRoot(props: ModalRootProps) {
  if (props.role === "alertdialog") {
    const { children, role, ...rootProps } = props;

    return (
      <ModalRoleContext.Provider value={role}>
        <AlertDialogBase.Root {...rootProps}>{children}</AlertDialogBase.Root>
      </ModalRoleContext.Provider>
    );
  }

  const {
    children,
    role = GOLDFINCH_MODAL_DEFAULT_VARIANTS.role,
    ...rootProps
  } = props;

  return (
    <ModalRoleContext.Provider value={role}>
      <DialogBase.Root {...rootProps}>{children}</DialogBase.Root>
    </ModalRoleContext.Provider>
  );
}

ModalRoot.displayName = "Modal.Root";

// Modal Trigger

type BaseModalTriggerProps = ComponentPropsWithoutRef<
  typeof DialogBase.Trigger
>;
type BaseAlertModalTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogBase.Trigger
>;

export type ModalTriggerProps =
  | BaseModalTriggerProps
  | BaseAlertModalTriggerProps;

function ModalTrigger({ children, ...props }: ModalTriggerProps) {
  const role = useModalRole();

  if (role === "alertdialog") {
    return (
      <AlertDialogBase.Trigger
        data-goldfinch-component="Modal"
        data-goldfinch-part="trigger"
        {...(props as BaseAlertModalTriggerProps)}
      >
        {children}
      </AlertDialogBase.Trigger>
    );
  }

  return (
    <DialogBase.Trigger
      data-goldfinch-component="Modal"
      data-goldfinch-part="trigger"
      {...props}
    >
      {children}
    </DialogBase.Trigger>
  );
}

ModalTrigger.displayName = "Modal.Trigger";

// Modal Title

type BaseModalTitleProps = ComponentPropsWithoutRef<typeof DialogBase.Title>;

export type ModalTitleProps = BaseModalTitleProps;

function ModalTitle({ className, ...props }: ModalTitleProps) {
  const role = useModalRole();
  const BaseTitle =
    role === "alertdialog" ? AlertDialogBase.Title : DialogBase.Title;
  return <BaseTitle className={className} {...props} />;
}

ModalTitle.displayName = "Modal.Title";

// Modal Description

type BaseModalDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogBase.Description
>;

export type ModalDescriptionProps = BaseModalDescriptionProps;

function ModalDescription({ className, ...props }: ModalDescriptionProps) {
  const role = useModalRole();
  const BaseDescription =
    role === "alertdialog"
      ? AlertDialogBase.Description
      : DialogBase.Description;
  return <BaseDescription className={className} {...props} />;
}

ModalDescription.displayName = "Modal.Description";

// Modal Close

type BaseModalCloseProps = ComponentPropsWithoutRef<typeof DialogBase.Close>;

export type ModalCloseProps = BaseModalCloseProps;

function ModalClose({ children, ...props }: ModalCloseProps) {
  const role = useModalRole();
  const BaseClose =
    role === "alertdialog" ? AlertDialogBase.Close : DialogBase.Close;
  return (
    <BaseClose data-goldfinch-component="Modal" data-goldfinch-part="close" {...props}>
      {children}
    </BaseClose>
  );
}

ModalClose.displayName = "Modal.Close";

// Compound Component Export

const Modal = Object.assign(ModalContent, {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});

export {
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
