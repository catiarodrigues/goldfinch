import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="primary" loading>
        Primary
      </Button>
    </div>
  );
}
