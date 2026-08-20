import { Input as InputBase } from "./input";
import { InputGroup } from "../input-group";
import { SensitiveInput } from "../sensitive-input/sensitive-input";

export { inputVariants, type InputProps } from "./input";
export { InputArea, Textarea, type InputAreaProps } from "./input-area";

// Re-export InputGroup from its new dedicated directory so that the subpath
// `@catiarodrigues/goldfinch/components/input` continues to resolve InputGroup.
export {
  InputGroup,
  GOLDFINCH_INPUT_GROUP_VARIANTS,
  GOLDFINCH_INPUT_GROUP_DEFAULT_VARIANTS,
} from "../input-group";

/**
 * Assembled here rather than in input.tsx: InputGroup and SensitiveInput both
 * import input.tsx's variant config, so input.tsx can't also import them at
 * module scope without a circular import.
 */
export const Input: typeof InputBase & {
  Group: typeof InputGroup;
  Sensitive: typeof SensitiveInput;
} = Object.assign(InputBase, {
  Group: InputGroup,
  Sensitive: SensitiveInput,
});

// Backward-compatible type aliases — the old `input-group.tsx` exported these
// names. External consumers importing from `@catiarodrigues/goldfinch/components/input`
// may reference them, so we keep the aliases to avoid breaking type imports.

/**
 * @deprecated `focusMode` is no longer a public prop — it is auto-detected by
 * `InputGroup` based on its children. This type will be removed in a future
 * major version.
 */
export type GoldfinchInputGroupFocusMode = "container" | "individual";

/**
 * @deprecated `focusMode` is no longer a public prop — it is auto-detected by
 * `InputGroup` based on its children. Use `InputGroupRootProps` from
 * `@catiarodrigues/goldfinch` instead. This type will be removed in a future major
 * version.
 */
export interface GoldfinchInputGroupVariantsProps {
  focusMode?: GoldfinchInputGroupFocusMode;
}
