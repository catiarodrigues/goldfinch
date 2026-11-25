import { isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * If a trigger's only child is a button (a Goldfinch `<Button>` or a native
 * `<button>`), returns it so the trigger can render *as* that button instead
 * of wrapping it in a second one (invalid `<button>` inside `<button>`).
 * Anything else (text, icons) returns `undefined` and keeps the trigger's own
 * focusable button wrapper.
 *
 * Matched by displayName, like compound parts, so this needs no import of
 * Button.
 */
export function buttonChildAsRender(
  children: ReactNode,
): ReactElement<Record<string, unknown>> | undefined {
  if (!isValidElement(children)) return undefined;
  const type = children.type;
  const isButton =
    type === "button" ||
    (typeof type !== "string" &&
      (type as { displayName?: string }).displayName === "Button");
  return isButton
    ? (children as ReactElement<Record<string, unknown>>)
    : undefined;
}
