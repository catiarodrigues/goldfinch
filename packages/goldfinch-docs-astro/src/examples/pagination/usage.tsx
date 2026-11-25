import { useState } from "react";
import { Pagination } from "@catiarodrigues/goldfinch";

export default function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} setPage={setPage} perPage={25} totalCount={500} />
  );
}
