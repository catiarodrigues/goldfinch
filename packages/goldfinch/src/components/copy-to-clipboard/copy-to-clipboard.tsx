import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Toast } from "@base-ui/react/toast";
import { Tooltip } from "@base-ui/react/tooltip";
import { Button } from "../button";
import { inputVariants } from "../input";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";

// Create a toast manager for anchored "Copied" toasts
const copyToClipboardToastManager = Toast.createToastManager();

/** CopyToClipboard size variant definitions mapping sizes to their Tailwind classes. */
export const GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS = {
  size: {
    sm: {
      classes: "text-xs",
      buttonSize: "sm" as const,
      description: "Small copy-to-clipboard for compact UIs",
    },
    base: {
      classes: "text-sm",
      buttonSize: "base" as const,
      description: "Default copy-to-clipboard size",
    },
    lg: {
      classes: "text-sm",
      buttonSize: "lg" as const,
      description: "Large copy-to-clipboard for prominent display",
    },
  },
} as const;

export const GOLDFINCH_COPY_TO_CLIPBOARD_DEFAULT_VARIANTS = {
  size: "lg",
} as const;

const copyToClipboardAnimations = {
  slide: {
    initial:
      "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 translate-y-full",
    animate: "translate-y-0 opacity-100",
    end: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 -translate-y-full",
  },
} as const;

// Derived types from GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS
export type GoldfinchCopyToClipboardSize =
  keyof typeof GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS.size;

export interface GoldfinchCopyToClipboardVariantsProps {
  /**
   * Size of the copy-to-clipboard field.
   * - `"sm"` — Small copy-to-clipboard for compact UIs
   * - `"base"` — Default copy-to-clipboard size
   * - `"lg"` — Large copy-to-clipboard for prominent display
   * @default "lg"
   */
  size?: GoldfinchCopyToClipboardSize;
}

export function copyToClipboardVariants({
  size = GOLDFINCH_COPY_TO_CLIPBOARD_DEFAULT_VARIANTS.size,
}: GoldfinchCopyToClipboardVariantsProps = {}) {
  return cn(
    // Base styles
    "flex items-center overflow-hidden bg-goldfinch-base px-0 font-mono",
    // Apply size styles from GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS
    resolveVariant(GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS.size, size, GOLDFINCH_COPY_TO_CLIPBOARD_DEFAULT_VARIANTS.size).classes,
  );
}

/**
 * CopyToClipboard component props.
 *
 * @example
 * ```tsx
 * <CopyToClipboard text="sk_live_abc123" />
 * <CopyToClipboard text="npm install @catiarodrigues/goldfinch" size="sm" />
 * ```
 */
export interface CopyToClipboardProps extends GoldfinchCopyToClipboardVariantsProps {
  /** The text to display and copy to clipboard. */
  text: string;
  /** If provided, this text will be copied to clipboard instead of the `text` prop. */
  textToCopy?: string;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
  /** Callback fired after text is copied to clipboard. */
  onCopy?: () => void;
  /**
   * Tooltip config. Shows tooltip on hover, anchored toast on click.
   * @example
   * ```tsx
   * <CopyToClipboard
   *   text="abc123"
   *   tooltip={{ text: "Copy", copiedText: "Copied!", side: "top" }}
   * />
   * ```
   */
  tooltip?: {
    /** Text shown in tooltip on hover. @default "Copy" */
    text?: string;
    /** Text shown in toast after copying. @default "Copied" */
    copiedText?: string;
    /** Tooltip/toast placement. @default "top" */
    side?: "top" | "bottom" | "left" | "right";
  };
  /** Accessible labels for i18n. */
  labels?: {
    /** @default "Copy to clipboard" */
    copyAction?: string;
  };
}

/**
 * Anchored toasts viewport - renders "Copied" toasts anchored to buttons
 */
function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Viewport className="pointer-events-none fixed inset-0 isolate">
      {toasts.map((toast) => (
        <Toast.Positioner key={toast.id} toast={toast} className="absolute">
          <Toast.Root
            toast={toast}
            className={cn(
              "flex origin-[var(--transform-origin)] flex-col rounded-md bg-goldfinch-base px-3 py-1.5 text-xs text-goldfinch-default font-sans",
              "shadow-lg shadow-goldfinch-tip-shadow outline outline-goldfinch-fill",
            )}
          >
            <Toast.Description />
          </Toast.Root>
        </Toast.Positioner>
      ))}
    </Toast.Viewport>
  );
}

/**
 * Internal wrapper that provides Toast context when tooltip is enabled.
 */
function TooltipWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider>
      <Toast.Provider toastManager={copyToClipboardToastManager}>
        <AnchoredToasts />
        {children}
      </Toast.Provider>
    </Tooltip.Provider>
  );
}

/**
 * Read-only text field with a one-click copy-to-clipboard button.
 *
 * @example
 * ```tsx
 * <CopyToClipboard text="0c239dd2" />
 * ```
 */
export const CopyToClipboard = forwardRef<HTMLDivElement, CopyToClipboardProps>(
  (
    {
      text,
      textToCopy,
      className,
      size = GOLDFINCH_COPY_TO_CLIPBOARD_DEFAULT_VARIANTS.size,
      onCopy,
      tooltip,
      labels: { copyAction = "Copy to clipboard" } = {},
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const sizeConfig = resolveVariant(GOLDFINCH_COPY_TO_CLIPBOARD_VARIANTS.size, size, GOLDFINCH_COPY_TO_CLIPBOARD_DEFAULT_VARIANTS.size);

    // Destructure tooltip config with defaults
    const {
      text: tooltipText = "Copy",
      copiedText = "Copied",
      side: tooltipSide = "top",
    } = tooltip ?? {};

    const copyToClipboard = useCallback(async () => {
      try {
        if (
          typeof navigator !== "undefined" &&
          navigator.clipboard &&
          typeof navigator.clipboard.writeText === "function"
        ) {
          await navigator.clipboard.writeText(textToCopy ?? text);
        } else if (typeof document !== "undefined") {
          // Fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = textToCopy ?? text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          const selection = document.getSelection();
          const previousRange = selection?.rangeCount
            ? selection.getRangeAt(0)
            : null;
          textarea.select();
          try {
            document.execCommand("copy");
          } finally {
            document.body.removeChild(textarea);
            if (previousRange) {
              selection?.removeAllRanges();
              selection?.addRange(previousRange);
            }
          }
        }

        setCopied(true);

        // Show anchored toast if tooltip mode is enabled
        if (tooltip) {
          copyToClipboardToastManager.add({
            description: copiedText,
            positionerProps: {
              anchor: buttonRef.current,
              side: tooltipSide,
              sideOffset: 8,
            },
            timeout: 1500,
            onClose() {
              setCopied(false);
            },
          });
        } else {
          // Reset copied state after delay when no tooltip
          setTimeout(() => setCopied(false), 1500);
        }

        onCopy?.();
      } catch (error) {
        console.warn("Clipboard copy failed", error);
      }
    }, [text, onCopy, tooltip, copiedText, tooltipSide]);

    const copyButton = (
      <Button
        ref={buttonRef}
        size={sizeConfig.buttonSize}
        variant="ghost"
        className={cn(
          "rounded-l-none rounded-r-[inherit] border-l! border-goldfinch-line! px-3 relative isolate overflow-hidden transition-all duration-200",
          "focus:ring-inset focus:ring-goldfinch-focus/50",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-goldfinch-brand",
        )}
        onClick={copyToClipboard}
        aria-label={copyAction}
      >
        <span
          className={cn(
            "flex items-center gap-1 transition-all duration-200",
            copied
              ? copyToClipboardAnimations.slide.animate
              : copyToClipboardAnimations.slide.initial,
          )}
        >
          <CheckIcon />
        </span>
        <span
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            copied
              ? copyToClipboardAnimations.slide.end
              : copyToClipboardAnimations.slide.animate,
          )}
        >
          <CopyIcon />
        </span>
      </Button>
    );

    return (
      <div
        ref={ref}
        className={cn(
          inputVariants({ size: sizeConfig.buttonSize }),
          copyToClipboardVariants({ size }),
          className,
        )}
      >
        <span className="grow truncate ps-4 pe-2">{text}</span>
        {tooltip ? (
          <TooltipWrapper>
            <Tooltip.Root
              disabled={copied}
              onOpenChange={(open, eventDetails) => {
                // Prevent tooltip from closing when button is clicked
                if (eventDetails.reason === "trigger-press") {
                  eventDetails.cancel();
                }
              }}
            >
              <Tooltip.Trigger render={copyButton} />
              <Tooltip.Portal>
                <Tooltip.Positioner side={tooltipSide} sideOffset={8}>
                  <Tooltip.Popup
                    className={cn(
                      "flex origin-[var(--transform-origin)] flex-col rounded-md bg-goldfinch-base px-3 py-1.5 text-xs text-goldfinch-default",
                      "shadow-lg shadow-goldfinch-tip-shadow outline outline-goldfinch-fill",
                    )}
                  >
                    {tooltipText}
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </TooltipWrapper>
        ) : (
          copyButton
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? copiedText : ""}
        </span>
      </div>
    );
  },
);

CopyToClipboard.displayName = "CopyToClipboard";
