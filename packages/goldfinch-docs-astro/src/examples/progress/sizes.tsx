import { Progress } from "@catiarodrigues/goldfinch";

export default function ProgressSizes() {
  return (
    <div className="flex flex-col gap-3">
      <Progress label="Storage used" value={65} />
      <Progress label="API requests" value={90} customValue="900 / 1,000" />
    </div>
  );
}
