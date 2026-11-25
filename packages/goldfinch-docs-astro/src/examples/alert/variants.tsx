import { Alert } from "@catiarodrigues/goldfinch";

export default function AlertVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Alert>Default</Alert>
      <Alert variant="alert">Alert</Alert>
      <Alert variant="error">Error</Alert>
      <Alert variant="secondary">Secondary</Alert>
    </div>
  );
}
