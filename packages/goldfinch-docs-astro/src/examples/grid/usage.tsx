import { Grid, GridItem } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Grid variant="3up" gap="base">
      <GridItem className="p-4">1</GridItem>
      <GridItem className="p-4">2</GridItem>
      <GridItem className="p-4">3</GridItem>
    </Grid>
  );
}
