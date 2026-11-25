import { Field as FieldBase } from "@base-ui/react/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { useId, type ReactElement, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { normalizeFieldError, type FieldErrorProp } from "./field";

export interface FieldsetProps {
  /** Legend naming the group. Omit to pass a `*.Legend` child instead. */
  legend?: ReactNode;
  /** Helper text below the group (hidden while an error is showing). */
  description?: ReactNode;
  /** Field error for the group, same forms and rules as Field's `error`. */
  error?: FieldErrorProp;
  disabled?: boolean;
  /**
   * The Base UI group element to render the fieldset as (e.g. `<RadioGroup/>`),
   * so the group itself is named by the legend and linked to the description
   * and error. Omit for a plain `<fieldset>`.
   */
  group?: ReactElement;
  /** Classes for the element wrapping the group and its messages. */
  className?: string;
  children: ReactNode;
}

/**
 * The legend, description and field error around a group of choices
 * (Checkbox.Group, Radio.Group, Toggle.Group). Internal: each group component
 * passes its own props through.
 */
export function Fieldset({
  legend,
  description,
  error,
  disabled,
  group,
  className,
  children,
}: FieldsetProps) {
  const fieldError = normalizeFieldError(error);
  const descriptionId = useId();
  const errorId = useId();
  const forcedInvalid = fieldError?.match === true;

  // A Base UI group (RadioGroup, CheckboxGroup) links itself to the Field's
  // description/error and reflects its validity. A plain <fieldset> can't, so
  // link it here. (Its `match` errors can't reflect browser validity: a group
  // of switches has none.)
  const plainFieldsetProps = group
    ? {}
    : {
        "aria-describedby":
          [description && descriptionId, fieldError && errorId].filter(Boolean).join(" ") ||
          undefined,
        "data-invalid": forcedInvalid ? "" : undefined,
      };

  return (
    <FieldBase.Root
      className={cn("group/field flex flex-col gap-4", className)}
      // An always-shown error makes the group invalid; a `match` error lets
      // the browser's validity decide.
      invalid={forcedInvalid ? true : undefined}
      disabled={disabled}
    >
      <BaseFieldset.Root
        render={group}
        disabled={disabled}
        className="flex flex-col gap-4"
        {...plainFieldsetProps}
      >
        {legend && (
          <BaseFieldset.Legend className="text-base font-medium text-goldfinch-default">
            {legend}
          </BaseFieldset.Legend>
        )}
        {children}
      </BaseFieldset.Root>
      {description && (
        <FieldBase.Description
          id={descriptionId}
          className={cn(
            "text-sm text-goldfinch-subtle",
            fieldError && "group-data-[invalid]/field:hidden",
          )}
        >
          {description}
        </FieldBase.Description>
      )}
      {fieldError && (
        <FieldBase.Error id={errorId} className="text-sm text-goldfinch-danger" match={fieldError.match}>
          {fieldError.message}
        </FieldBase.Error>
      )}
    </FieldBase.Root>
  );
}
