import { Combobox as ComboboxBase } from "@base-ui/react/combobox";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react";
import { useMemo, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import {
  usePortalContainer,
  type PortalContainer,
} from "../../utils/portal-provider";
import { Field, type FieldErrorProp } from "../field/field";
import {
  GOLDFINCH_INPUT_VARIANTS,
  inputVariants,
  type GoldfinchInputSize,
} from "../input/input-variants";

/** Combobox size definitions: the same sizes as Input. */
export const GOLDFINCH_COMBOBOX_VARIANTS = {
  size: GOLDFINCH_INPUT_VARIANTS.size,
} as const;

export const GOLDFINCH_COMBOBOX_DEFAULT_VARIANTS = {
  size: "base",
} as const;

/** An option with a value different from the text shown for it. */
export interface ComboboxItem {
  /** What `value` and `onValueChange` use. */
  value: string;
  /** The text shown in the list and in the input once chosen. */
  label: string;
  /** When `true`, the option can't be chosen. */
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Options to choose from: strings, or `{ value, label }` objects. */
  items: ReadonlyArray<string | ComboboxItem>;
  /** Visible label. Wraps the combobox in a Field. */
  label?: ReactNode;
  /** Tooltip content shown next to the label via an info icon. */
  labelTooltip?: ReactNode;
  /** Helper text displayed below the combobox. */
  description?: ReactNode;
  /** Field error: a message (always shown) or `{ message, match }` (shown on that validity failure). */
  error?: FieldErrorProp;
  /** When explicitly `false`, shows "(optional)" after the label. */
  required?: boolean;
  /** Text shown in the input before anything is typed or chosen. */
  placeholder?: string;
  /** The chosen option's value (controlled). `null` when nothing is chosen. */
  value?: string | null;
  /** The initially chosen option's value (uncontrolled). */
  defaultValue?: string | null;
  /** Called with the chosen option's value, or `null` when the choice is cleared. */
  onValueChange?: (value: string | null) => void;
  /** Shown in the list when no option matches what was typed. */
  emptyMessage?: ReactNode;
  /** Input size. Matches Input and Select. */
  size?: GoldfinchInputSize;
  /** Prevents interaction. */
  disabled?: boolean;
  /** Name submitted with a form. */
  name?: string;
  /** Accessible name when there's no visible `label`. */
  "aria-label"?: string;
  /** Additional CSS classes for the input, merged via `cn()`. */
  className?: string;
  /**
   * Container for the popup. Use it to render inside a Shadow DOM or a custom
   * container. Overrides `GoldfinchPortalProvider` context.
   * @default document.body (or GoldfinchPortalProvider container if set)
   */
  container?: PortalContainer;
}

const toItem = (item: string | ComboboxItem): ComboboxItem =>
  typeof item === "string" ? { value: item, label: item } : item;

/**
 * Combobox — a text input that filters a list of options as you type.
 *
 * Use it instead of `Select` when the list is long enough that people would
 * rather type than scroll, such as countries or time zones.
 *
 * @example
 * ```tsx
 * <Combobox
 *   label="Country"
 *   items={["Portugal", "Spain", "France"]}
 *   value={country}
 *   onValueChange={setCountry}
 * />
 * ```
 */
export function Combobox({
  items,
  label,
  labelTooltip,
  description,
  error,
  required,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  emptyMessage = "No results",
  size = GOLDFINCH_COMBOBOX_DEFAULT_VARIANTS.size,
  disabled,
  name,
  "aria-label": ariaLabel,
  className,
  container: containerProp,
}: ComboboxProps) {
  const contextContainer = usePortalContainer();
  const container = containerProp ?? contextContainer ?? undefined;

  // Base UI works with the item objects; callers work with their values.
  const options = useMemo(() => items.map(toItem), [items]);
  const find = (v: string | null | undefined) =>
    v == null ? v : (options.find((o) => o.value === v) ?? null);

  const control = (
    <ComboboxBase.Root<ComboboxItem>
      items={options}
      value={find(value)}
      defaultValue={find(defaultValue)}
      onValueChange={(item) => onValueChange?.(item?.value ?? null)}
      itemToStringLabel={(item) => item.label}
      itemToStringValue={(item) => item.value}
      isItemEqualToValue={(a, b) => a.value === b.value}
      disabled={disabled}
      required={required}
      name={name}
    >
      <div className="relative">
        <ComboboxBase.Input
          data-goldfinch-component="Combobox"
          data-goldfinch-part="input"
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={cn(
            inputVariants({ size, focusIndicator: true }),
            "w-full pr-9",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        />
        <CaretUpDownIcon
          aria-hidden
          size={16}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-goldfinch-subtle"
        />
      </div>
      <ComboboxBase.Portal container={container}>
        <ComboboxBase.Positioner sideOffset={4}>
          <ComboboxBase.Popup
            data-goldfinch-component="Combobox"
            data-goldfinch-part="popup"
            className={cn(
              "max-h-[min(var(--available-height),20rem)] w-[var(--anchor-width)] overflow-y-auto",
              "rounded-lg bg-goldfinch-base py-1.5 text-goldfinch-default shadow-lg ring ring-goldfinch-line",
            )}
          >
            <ComboboxBase.Empty className="px-3.5 py-1.5 text-base text-goldfinch-subtle empty:hidden">
              {emptyMessage}
            </ComboboxBase.Empty>
            <ComboboxBase.List>
              {(item: ComboboxItem) => (
                <ComboboxBase.Item
                  key={item.value}
                  value={item}
                  disabled={item.disabled}
                  data-goldfinch-component="Combobox"
                  data-goldfinch-part="option"
                  className={cn(
                    "mx-1.5 flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-base outline-none",
                    "data-highlighted:bg-goldfinch-tint",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <ComboboxBase.ItemIndicator>
                    <CheckIcon size={16} aria-hidden />
                  </ComboboxBase.ItemIndicator>
                </ComboboxBase.Item>
              )}
            </ComboboxBase.List>
          </ComboboxBase.Popup>
        </ComboboxBase.Positioner>
      </ComboboxBase.Portal>
    </ComboboxBase.Root>
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
      {control}
    </Field>
  );
}

Combobox.displayName = "Combobox";
