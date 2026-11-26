import { Eye, EyeSlash } from "@phosphor-icons/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Input as BaseInput } from "@base-ui/react/input";
import {
  inputVariants,
  GOLDFINCH_INPUT_VARIANTS,
  type GoldfinchInputSize,
  type GoldfinchInputVariant,
} from "../input/input-variants";
import { Field, type FieldErrorProp } from "../field/field";

export const GOLDFINCH_SENSITIVE_INPUT_VARIANTS = GOLDFINCH_INPUT_VARIANTS;

export const GOLDFINCH_SENSITIVE_INPUT_DEFAULT_VARIANTS = {
  size: "base",
  variant: "default",
} as const;

type Mode = "masked" | "revealed" | "empty";

/**
 * SensitiveInput component props.
 *
 * @example
 * ```tsx
 * <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
 * <SensitiveInput label="Secret" value={secret} onValueChange={setSecret} />
 * ```
 */
export interface SensitiveInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "type" | "value" | "defaultValue"
> {
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Simplified change handler receiving just the value */
  onValueChange?: (value: string) => void;
  /** Callback fired after value is copied to clipboard */
  onCopy?: () => void;
  /**
   * Size of the input.
   * - `"xs"` — Extra small for compact UIs
   * - `"sm"` — Small for secondary fields
   * - `"base"` — Default input size
   * - `"lg"` — Large for prominent fields
   * @default "base"
   */
  size?: GoldfinchInputSize;
  /**
   * Style variant of the input.
   * - `"default"` — Default input appearance
   * - `"error"` — Error state for validation failures
   * @default "default"
   */
  variant?: GoldfinchInputVariant;
  /** Label content for the input (enables Field wrapper and sets masked state label) - can be a string or any React node */
  label?: ReactNode;
  /** Tooltip content to display next to the label via an info icon */
  labelTooltip?: ReactNode;
  /** Helper text displayed below the input */
  description?: ReactNode;
  /** Error message or validation error object */
  error?: FieldErrorProp;
}

/**
 * Password/secret input that masks its value by default and reveals on click.
 * Includes a built-in copy-to-clipboard button on hover.
 *
 * @example
 * ```tsx
 * <SensitiveInput label="API Key" defaultValue="sk_live_abc123xyz789" />
 * ```
 */
export const SensitiveInput = forwardRef<HTMLInputElement, SensitiveInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onValueChange,
      onCopy,
      size = GOLDFINCH_SENSITIVE_INPUT_DEFAULT_VARIANTS.size,
      variant,
      disabled = false,
      readOnly = false,
      id,
      autoComplete = "off",
      className,
      label,
      labelTooltip,
      description,
      error,
      required,
      ...inputProps
    },
    ref,
  ) => {
    // Deprecation warning for variant="error"
    if (process.env.NODE_ENV !== "production" && variant === "error") {
      console.warn(
        '[Goldfinch SensitiveInput]: variant="error" is deprecated. ' +
          "Error styling is now automatically applied when the `error` prop is truthy. " +
          "Simply remove the variant prop and pass an error message instead.",
      );
    }

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = isControlled ? controlledValue : internalValue;
    const hasValue = value.length > 0;

    const [mode, setMode] = useState<Mode>(() =>
      hasValue ? "masked" : "empty",
    );

    const [copied, setCopied] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const eyeButtonRef = useRef<HTMLButtonElement>(null);
    const liveRegionId = useId();
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // Reset copied state after 2 seconds
    useEffect(() => {
      if (copied) {
        const timeoutId = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeoutId);
      }
    }, [copied]);

    const copyToClipboard = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
          if (
            typeof navigator !== "undefined" &&
            navigator.clipboard &&
            typeof navigator.clipboard.writeText === "function"
          ) {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            onCopy?.();
            return;
          }
        } catch {
          // Fall through to manual fallback
        }

        if (typeof document !== "undefined") {
          const textarea = document.createElement("textarea");
          textarea.value = value;
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
            setCopied(true);
            onCopy?.();
          } catch (copyError) {
            console.warn("Clipboard copy failed", copyError);
          } finally {
            document.body.removeChild(textarea);
            if (previousRange) {
              selection?.removeAllRanges();
              selection?.addRange(previousRange);
            }
          }
        }
      },
      [value, onCopy],
    );

    // Sync mode when value changes externally
    const prevHasValueRef = useRef(hasValue);
    if (prevHasValueRef.current !== hasValue) {
      prevHasValueRef.current = hasValue;
      if (!hasValue && mode === "masked") {
        setMode("empty");
      }
    }

    const handleContainerClick = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        // Ignore the click a <label> forwards to its input: it targets the
        // input itself, which ignores the pointer while masked, so every real
        // activation (mouse, touch, screen reader, keyboard-triggered click)
        // targets the container instead. Checking coordinates instead broke
        // assistive tech, whose clicks carry none.
        if (e.target === inputRef.current) return;
        if (mode === "masked" && hasValue) {
          setMode("revealed");
          if (!readOnly) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }
      },
      [mode, hasValue, disabled, readOnly],
    );

    const handleToggleVisibility = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (mode === "revealed") {
          setMode("masked");
        } else if (hasValue) {
          setMode("revealed");
          if (!readOnly) setTimeout(() => inputRef.current?.focus(), 0);
        }
      },
      [mode, hasValue, readOnly],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) {
          setInternalValue(newValue);
        }
        // When typing into an empty field, switch to revealed mode
        // so the input shows as type="text" instead of type="password"
        if (mode === "empty" && newValue.length > 0) {
          setMode("revealed");
        }
        onChange?.(e);
        onValueChange?.(newValue);
      },
      [isControlled, onChange, onValueChange, mode],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Don't mask if focus is moving to a button inside the container (copy/eye buttons)
        if (
          containerRef.current &&
          e.relatedTarget instanceof Node &&
          containerRef.current.contains(e.relatedTarget)
        ) {
          return;
        }
        if (hasValue) {
          setMode("masked");
        }
      },
      [hasValue],
    );

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (mode === "revealed" && e.key === "Escape") {
          setMode("masked");
          // Return focus to the eye button: the input leaves the tab order when masked
          setTimeout(() => eyeButtonRef.current?.focus(), 0);
        }
      },
      [mode],
    );

    const isMaskedWithValue = mode === "masked" && hasValue;
    // The eye button is how keyboard and screen-reader users reveal a masked
    // value, so it shows whenever there's a value to reveal or hide.
    const showEyeButton = !disabled && (mode === "revealed" || hasValue);
    const valueName = typeof label === "string" ? label : "value";

    // Icon sizes matching input sizes
    const iconSize = size === "xs" || size === "sm" ? "size-3" : "size-4";

    const containerClassName = cn(
      inputVariants({ size, variant, parentFocusIndicator: true }),
      "group/container relative flex w-full items-center",
      // Show browser-native focus outline on container when child input is focused
      "focus-within:outline focus-within:outline-2 focus-within:outline-goldfinch-focus",
      isMaskedWithValue && !disabled && "cursor-pointer",
      disabled && "cursor-not-allowed",
      className,
    );

    const containerContent = (
      <>
        {/* Input - defines the width, always rendered */}
        <BaseInput
          ref={mergedRef}
          id={inputId}
          type={mode === "revealed" ? "text" : "password"}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleInputKeyDown}
          disabled={disabled}
          readOnly={readOnly || isMaskedWithValue}
          autoComplete={autoComplete}
          tabIndex={isMaskedWithValue ? -1 : 0}
          className={cn(
            "goldfinch-input-placeholder w-full border-0 bg-transparent p-0 text-goldfinch-default ring-0 outline-none disabled:cursor-not-allowed disabled:text-goldfinch-subtle",
            size === "xs" && "pr-5",
            size === "sm" && "pr-6",
            size === "base" && "pr-8",
            size === "lg" && "pr-10",
            isMaskedWithValue && "pointer-events-none text-transparent",
          )}
          aria-hidden={isMaskedWithValue}
          {...inputProps}
        />

        {/* Mask overlay - absolutely positioned, doesn't affect layout */}
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden select-none",
            // Match input pr padding (space for icon)
            size === "xs" && "right-5",
            size === "sm" && "right-6",
            size === "base" && "right-8",
            size === "lg" && "right-10",
            // Match the padding from inputVariants
            size === "xs" && "px-1.5",
            size === "sm" && "px-2",
            size === "base" && "px-3",
            size === "lg" && "px-4",
            // Hidden when not masked
            !isMaskedWithValue && "invisible",
            // When masked: enable pointer events
            isMaskedWithValue && "pointer-events-auto",
            // Text color - use text-goldfinch-default to contrast with bg-goldfinch-control input background
            "text-goldfinch-default",
            // Hover state - pure CSS, no React state (group for children)
            "group/mask",
          )}
          aria-hidden="true"
        >
          {/* Both texts rendered, stacked. Visibility toggled on hover to prevent layout shift */}
          <span className="relative">
            <span
              className={cn(
                isMaskedWithValue &&
                  !disabled &&
                  "group-focus-within/container:invisible group-hover/mask:invisible",
              )}
            >
              ••••••••
            </span>
            {isMaskedWithValue && !disabled && (
              <span className="invisible absolute top-0 left-0 whitespace-nowrap text-goldfinch-subtle group-focus-within/container:visible group-hover/mask:visible">
                Click to reveal
              </span>
            )}
          </span>
        </span>

        {/* Eye button - absolutely positioned to the right */}
        <button
          ref={eyeButtonRef}
          type="button"
          data-goldfinch-component="SensitiveInput"
          data-goldfinch-part="toggle-visibility"
          onClick={handleToggleVisibility}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label={`${mode === "revealed" ? "Hide" : "Reveal"} ${valueName}`}
          tabIndex={showEyeButton ? 0 : -1}
          className={cn(
            "absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer text-goldfinch-subtle hover:text-goldfinch-default focus:text-goldfinch-default focus:ring-goldfinch-focus/50 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
            // Defensive styles to prevent global CSS pollution (e.g., button { background: gray })
            "m-0 inline-flex h-auto min-h-0 items-center justify-center border-none bg-transparent p-0 shadow-none",
            // Match right padding from inputVariants
            size === "xs" && "right-1.5",
            size === "sm" && "right-2",
            size === "base" && "right-3",
            size === "lg" && "right-4",
            iconSize,
            !showEyeButton && "pointer-events-none opacity-0",
          )}
        >
          {mode === "revealed" ? (
            <EyeSlash className="size-full" />
          ) : (
            <Eye className="size-full" />
          )}
        </button>

        {/* Copy tab - appears on hover/focus at top right (hidden when disabled) */}
        {hasValue && !disabled && (
          <button
            type="button"
            data-goldfinch-component="SensitiveInput"
            data-goldfinch-part="copy"
            onClick={copyToClipboard}
            onKeyDown={(e) => e.stopPropagation()}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            className={cn(
              "absolute -top-px right-2 -translate-y-full cursor-pointer rounded-t-md bg-goldfinch-brand px-2 py-0.5 text-xs text-goldfinch-inverse opacity-0 transition-opacity group-focus-within/container:opacity-100 group-hover/container:opacity-100 hover:brightness-120 focus:ring-goldfinch-focus/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
              // Defensive styles to prevent global CSS pollution
              "m-0 h-auto min-h-0 border-none shadow-none",
            )}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </>
    );

    const input = (
      <div>
        {/* Clicking a masked value reveals it (mouse convenience); keyboard and
            screen-reader users use the eye button. Not role="button": it
            contains other controls, and buttons can't nest. */}
        {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- mouse shortcut; the eye button is the keyboard/AT equivalent */}
        <div
          ref={containerRef}
          data-goldfinch-component="SensitiveInput"
          data-goldfinch-part={
            isMaskedWithValue ? "masked-container" : undefined
          }
          className={containerClassName}
          onClick={isMaskedWithValue ? handleContainerClick : undefined}
        >
          {containerContent}
        </div>
        <span id={liveRegionId} className="sr-only" aria-live="polite">
          {mode === "masked" && hasValue && "Value hidden"}
          {copied && "Copied to clipboard"}
        </span>
      </div>
    );

    // Field decides whether there's anything to wrap, and owns invalid state.
    return (
      <Field
        label={label}
        required={required}
        labelTooltip={labelTooltip}
        description={description}
        error={error}
      >
        {input}
      </Field>
    );
  },
);

SensitiveInput.displayName = "SensitiveInput";
