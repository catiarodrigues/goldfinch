import { Spinner } from "@catiarodrigues/goldfinch";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="base" />
      <Spinner size="lg" />
    </div>
  );
}
