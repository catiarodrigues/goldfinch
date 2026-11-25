import { TableOfContents } from "@catiarodrigues/goldfinch";

export default function TableOfContentsBasic() {
  return (
    <TableOfContents>
      <TableOfContents.List>
        <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
        <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
        <TableOfContents.Item href="#api">API</TableOfContents.Item>
      </TableOfContents.List>
    </TableOfContents>
  );
}
