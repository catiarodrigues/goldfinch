import { SensitiveInput, Field } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Field label="API Key">
      <SensitiveInput placeholder="sk-..." aria-label="API Key" />
    </Field>
  );
}
