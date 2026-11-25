import { Input } from "@catiarodrigues/goldfinch";

export default function InputVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input placeholder="Default" aria-label="Default input" />
      <Input
        placeholder="Error state"
        error="This field is required"
        aria-label="Error input"
      />
    </div>
  );
}
