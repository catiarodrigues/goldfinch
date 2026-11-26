import { Switch as BaseSwitch } from "@base-ui/react/switch";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type Ref,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { cn } from "../../utils/cn";
import { resolveVariant } from "../../utils/resolve-variant";
import { Field, type FieldErrorProp } from "../field/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Fieldset } from "../field/fieldset";

/** Toggle size and variant definitions mapping names to their Tailwind classes. */
export const GOLDFINCH_TOGGLE_VARIANTS = {
  size: {
    sm: {
      classes: "h-5.5 w-8.5",
      description: "Small toggle for compact UIs",
    },
    base: {
      classes: "h-6.5 w-10.5",
      description: "Default toggle size",
    },
    lg: {
      classes: "h-7.5 w-12.5",
      description: "Large toggle for prominent toggles",
    },
  },
  variant: {
    default: {
      classes: "",
      description: "Default toggle with pill shape",
    },
    neutral: {
      classes: "",
      description: "Monochrome toggle with pill shape for subtle toggles",
    },
  },
} as const;

export const GOLDFINCH_TOGGLE_DEFAULT_VARIANTS = {
  size: "base",
  variant: "default",
} as const;

// Derived types from GOLDFINCH_TOGGLE_VARIANTS
export type GoldfinchToggleSize = keyof typeof GOLDFINCH_TOGGLE_VARIANTS.size;
export type GoldfinchToggleVariant =
  keyof typeof GOLDFINCH_TOGGLE_VARIANTS.variant;

export interface GoldfinchToggleVariantsProps {
  size?: GoldfinchToggleSize;
  variant?: GoldfinchToggleVariant;
}

export function toggleVariants({
  size = GOLDFINCH_TOGGLE_DEFAULT_VARIANTS.size,
  variant = GOLDFINCH_TOGGLE_DEFAULT_VARIANTS.variant,
}: GoldfinchToggleVariantsProps = {}) {
  const sizeConfig = resolveVariant(
    GOLDFINCH_TOGGLE_VARIANTS.size,
    size,
    GOLDFINCH_TOGGLE_DEFAULT_VARIANTS.size,
  );
  const variantConfig = resolveVariant(
    GOLDFINCH_TOGGLE_VARIANTS.variant,
    variant,
    GOLDFINCH_TOGGLE_DEFAULT_VARIANTS.variant,
  );
  return cn(sizeConfig.classes, variantConfig.classes);
}

export type ToggleSize = GoldfinchToggleSize;
export type ToggleVariant = GoldfinchToggleVariant;

const ToggleGroupContext = createContext<{
  controlFirst: boolean;
  variant?: ToggleVariant;
}>({
  controlFirst: true,
});

export type ToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** `default` shows an ink track when on; `neutral` a softer grey one, for lists of several toggles. */
  variant?: ToggleVariant;
  /** Visible label. Wraps the toggle in a Field. */
  label?: ReactNode;
  /** Tooltip content shown next to the label via an info icon. */
  labelTooltip?: ReactNode;
  /** Helper text displayed below the toggle */
  description?: ReactNode;
  /** Field error: a message (always shown) or `{ message, match }` (shown on that validity failure) */
  error?: FieldErrorProp;
  /** When explicitly `false`, shows "(optional)" after the label. */
  required?: boolean;
  /** Places the switch before the label. Set `false` to put the label first. */
  controlFirst?: boolean;
  /** Switch size. */
  size?: GoldfinchToggleSize;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  /** Whether the toggle is on (controlled). */
  checked?: boolean;
  /** Prevents interaction. */
  disabled?: boolean;
  /** Called with the new state when the user flips the toggle. */
  onCheckedChange?: (checked: boolean) => void;
  /** Shows the toggle as saving: the knob dims and pulses, and `aria-busy` is set. */
  transitioning?: boolean;
};

export interface ToggleLegendProps {
  children: ReactNode;
  className?: string;
}

export interface ToggleGroupProps {
  /** Legend naming the group. Omit it to pass a `Toggle.Legend` child instead. */
  legend?: string;
  /** The group's `Toggle.Item`s. */
  children: ReactNode;
  /** Field error for the group: a message (always shown) or `{ message, match }` */
  error?: FieldErrorProp;
  /** Helper text below the group, hidden while an error is showing. */
  description?: ReactNode;
  /** Disables every toggle in the group. */
  disabled?: boolean;
  /** Places each switch before its label. Set `false` to put labels first. */
  controlFirst?: boolean;
  /** Variant for every item that doesn't set its own. Groups default to `neutral` so no single switch stands out. */
  variant?: ToggleVariant;
  /** Additional CSS classes merged via `cn()`. */
  className?: string;
}

export type ToggleItemProps = {
  /** Overrides the group's variant for this item. */
  variant?: ToggleVariant;
  label: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: GoldfinchToggleSize;
  /** Shows the toggle as saving: the knob dims and pulses, and `aria-busy` is set. */
  transitioning?: boolean;
};

const ToggleBase = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      disabled,
      size = "base",
      variant = "default",
      label,
      labelTooltip,
      description,
      error,
      required,
      controlFirst = true,
      onCheckedChange,
      transitioning,
      id,
      ...props
    },
    ref,
  ) => {
    const ariaLabelFallback = typeof label === "string" ? label : "Toggle";
    const switchControl = (
      <BaseSwitch.Root
        ref={ref}
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        nativeButton
        render={(rootProps, state) => {
          const {
            ref: rootRef,
            className: baseClassName,
            role: baseRole,
            "aria-checked": _ariaChecked,
            "aria-pressed": _ariaPressed,
            ...restRootProps
          } = rootProps as typeof rootProps & {
            ref?: Ref<HTMLButtonElement>;
            className?: string;
            role?: string;
            "aria-checked"?: boolean;
            "aria-pressed"?: boolean;
          };

          const isNeutral = variant === "neutral";

          const pillRadius = "rounded-full";

          const sizeStyles = {
            sm: { track: "h-4 w-8", thumb: "w-4", slide: "left-4" },
            base: { track: "h-4.5 w-9", thumb: "w-4.5", slide: "left-4.5" },
            lg: { track: "h-5 w-10", thumb: "w-5", slide: "left-5" },
          };
          const s = sizeStyles[size];

          const trackColors = isNeutral
            ? state.checked
              ? "bg-neutral-500 dark:bg-goldfinch-base ring-neutral-600 dark:ring-neutral-700"
              : "bg-neutral-150 dark:bg-goldfinch-base ring-goldfinch-control-edge"
            : state.checked
              ? "bg-goldfinch-contrast ring-goldfinch-contrast"
              : "bg-neutral-200 dark:bg-neutral-700 ring-goldfinch-control-edge";

          const thumbColors = isNeutral
            ? state.checked
              ? "bg-goldfinch-base dark:bg-neutral-400"
              : "bg-goldfinch-base dark:bg-neutral-850"
            : state.checked
              ? "bg-goldfinch-base"
              : "bg-goldfinch-base dark:bg-neutral-850";

          const trackClassName = cn(
            "relative inline-flex items-center ring cursor-pointer border-none p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
            "transition-colors duration-150 ease-out motion-reduce:transition-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            s.track,
            pillRadius,
            trackColors,
            className,
            baseClassName,
          );

          const thumbClassName = cn(
            "absolute top-0 bottom-0 shadow-[0_0_1px_0.5px_var(--color-goldfinch-shadow-edge),0_1px_2px_var(--color-goldfinch-shadow-drop)]",
            s.thumb,
            pillRadius,
            thumbColors,
            "transition-all duration-150 ease-out motion-reduce:transition-none",
            state.checked ? s.slide : "left-0",
            transitioning && "opacity-60 motion-safe:animate-pulse",
          );

          const role =
            (props.role as string | undefined) ?? baseRole ?? "switch";
          const checkedA11yProps =
            role === "switch"
              ? { "aria-checked": state.checked }
              : { "aria-pressed": state.checked };

          return (
            <button
              {...restRootProps}
              {...props}
              ref={rootRef}
              data-goldfinch-component="Toggle"
              type="button"
              role={role}
              {...checkedA11yProps}
              aria-busy={transitioning || undefined}
              aria-label={props["aria-label"] ?? ariaLabelFallback}
              className={trackClassName}
            >
              <div className={thumbClassName} />
            </button>
          );
        }}
      />
    );

    // Field decides whether there's anything to wrap, and owns invalid state.
    return (
      <Field
        label={label}
        required={required}
        labelTooltip={labelTooltip}
        description={description}
        error={error}
        controlFirst={controlFirst}
      >
        {switchControl}
      </Field>
    );
  },
);

ToggleBase.displayName = "Toggle";

const ToggleItem = forwardRef<HTMLButtonElement, ToggleItemProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      disabled,
      size = "base",
      variant: itemVariant,
      label,
      onCheckedChange,
      transitioning,
    },
    ref,
  ) => {
    const { controlFirst, variant: groupVariant } =
      useContext(ToggleGroupContext);
    const variant = itemVariant ?? groupVariant ?? "default";

    return (
      <label
        data-goldfinch-component="Toggle"
        data-goldfinch-part="item-label"
        className={cn(
          "relative m-0 inline-flex items-center gap-2",
          !controlFirst && "flex-row-reverse justify-end",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className,
        )}
      >
        <BaseSwitch.Root
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          nativeButton
          render={(rootProps, state) => {
            const {
              ref: rootRef,
              className: baseClassName,
              role: baseRole,
              "aria-checked": _ariaChecked,
              "aria-pressed": _ariaPressed,
              ...restRootProps
            } = rootProps as typeof rootProps & {
              ref?: Ref<HTMLButtonElement>;
              className?: string;
              role?: string;
              "aria-checked"?: boolean;
              "aria-pressed"?: boolean;
            };

            const isNeutral = variant === "neutral";

            const pillRadius = "rounded-full";

            const sizeStyles = {
              sm: { track: "h-4 w-8", thumb: "w-4", slide: "left-4" },
              base: { track: "h-4.5 w-9", thumb: "w-4.5", slide: "left-4.5" },
              lg: { track: "h-5 w-10", thumb: "w-5", slide: "left-5" },
            };
            const s = sizeStyles[size];

            const trackColors = isNeutral
              ? state.checked
                ? "bg-neutral-500 dark:bg-goldfinch-base ring-neutral-600 dark:ring-neutral-700"
                : "bg-neutral-150 dark:bg-goldfinch-base ring-goldfinch-control-edge"
              : state.checked
                ? "bg-goldfinch-contrast ring-goldfinch-contrast"
                : "bg-neutral-200 dark:bg-neutral-700 ring-goldfinch-control-edge";

            const thumbColors = isNeutral
              ? state.checked
                ? "bg-goldfinch-base dark:bg-neutral-400"
                : "bg-goldfinch-base dark:bg-neutral-850"
              : state.checked
                ? "bg-goldfinch-base"
                : "bg-goldfinch-base dark:bg-neutral-850";

            const trackClassName = cn(
              "relative inline-flex items-center ring cursor-pointer border-none p-0",
              "focus:outline-none focus:ring-goldfinch-focus/50 focus-visible:ring-2 focus-visible:ring-goldfinch-focus",
              "transition-colors duration-150 ease-out motion-reduce:transition-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              s.track,
              pillRadius,
              trackColors,
              baseClassName,
            );

            const thumbClassName = cn(
              "absolute top-0 bottom-0 shadow-[0_0_1px_0.5px_var(--color-goldfinch-shadow-edge),0_1px_2px_var(--color-goldfinch-shadow-drop)]",
              s.thumb,
              pillRadius,
              thumbColors,
              "transition-all duration-150 ease-out motion-reduce:transition-none",
              state.checked ? s.slide : "left-0",
              transitioning && "opacity-60 motion-safe:animate-pulse",
            );

            const role = baseRole ?? "switch";
            const checkedA11yProps =
              role === "switch"
                ? { "aria-checked": state.checked }
                : { "aria-pressed": state.checked };

            return (
              <button
                {...restRootProps}
                ref={rootRef}
                data-goldfinch-component="Toggle"
                data-goldfinch-part="item"
                type="button"
                role={role}
                {...checkedA11yProps}
                aria-busy={transitioning || undefined}
                className={trackClassName}
              >
                <div className={thumbClassName} />
              </button>
            );
          }}
        />
        <span className="text-base font-medium text-goldfinch-default">
          {label}
        </span>
      </label>
    );
  },
);

ToggleItem.displayName = "Toggle.Item";

function ToggleLegend({ children, className }: ToggleLegendProps) {
  return (
    <BaseFieldset.Legend
      className={cn("text-base font-medium text-goldfinch-default", className)}
    >
      {children}
    </BaseFieldset.Legend>
  );
}

ToggleLegend.displayName = "Toggle.Legend";

function ToggleGroup({
  legend,
  children,
  error,
  description,
  disabled,
  controlFirst = true,
  variant = "neutral",
  className,
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ controlFirst, variant }}>
      <Fieldset
        legend={legend}
        description={description}
        error={error}
        disabled={disabled}
        className={className}
      >
        <div className="flex flex-col gap-2">{children}</div>
      </Fieldset>
    </ToggleGroupContext.Provider>
  );
}

export const Toggle = Object.assign(ToggleBase, {
  Item: ToggleItem,
  Group: ToggleGroup,
  Legend: ToggleLegend,
});

Toggle.displayName = "Toggle";
