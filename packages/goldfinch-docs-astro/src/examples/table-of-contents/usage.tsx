import { TableOfContents } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        <TableOfContents.Item href="#installation">
          Installation
        </TableOfContents.Item>
        <TableOfContents.Group label="Usage" href="#usage">
          <TableOfContents.Item href="#examples">Examples</TableOfContents.Item>
        </TableOfContents.Group>
      </TableOfContents.List>
    </TableOfContents>
  );
}
