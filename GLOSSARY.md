# Goldfinch

A React component library: accessible, themeable building blocks for forms, navigation,
overlays and layout.

## Forms

**Form control**:
A component a user enters or chooses a value with: Input, InputArea, SensitiveInput,
InputGroup, Select, Checkbox, Radio, Toggle.
_Avoid_: input (when you mean any control), widget

**Field**:
The label, description and error that surround one form control and give it its accessible
name and messages.
_Avoid_: form group, form item, wrapper

**Fieldset**:
The legend, description and error that surround a group of related choices (checkboxes,
radios, toggles) and name them as one question. Follows the same field error rules as a field.
_Avoid_: group label, field group

**Field error**:
The message shown when a field is invalid. It is either always shown, or shown only when the
browser's own validation fails a specific check (such as a missing required value). A field
is invalid exactly when its field error is showing: the message, the invalid styling and the
invalid state for assistive tech always appear and disappear together. Text fields and
selects mark the control itself as invalid; choice controls (checkboxes, radios, toggles)
show a field error by its message alone.
_Avoid_: validation message, error state, variant="error"
