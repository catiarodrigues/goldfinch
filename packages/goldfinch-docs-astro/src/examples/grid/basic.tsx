import { Grid } from "@catiarodrigues/goldfinch";

export default function GridBasic() {
  return (
    <Grid variant="3up" gap="base">
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">
        1
      </div>
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">
        2
      </div>
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">
        3
      </div>
    </Grid>
  );
}
