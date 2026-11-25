import { useState } from "react";
import { Pagination } from "@catiarodrigues/goldfinch";

export default function PaginationBasic() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} setPage={setPage} perPage={10} totalCount={100} />
  );
}
