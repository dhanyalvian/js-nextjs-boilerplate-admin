//- src/app/(admin)/socials/quotes/column.tsx

import { RespSocialQuoteList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"

export const Columns: Column<RespSocialQuoteList>[] = [
  {
    key: "quote",
    header: "Quote",
    size: 0,
  },
  {
    key: "author",
    header: "Author",
    size: 300,
  },
  {
    key: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    // enableSorting: false,
    render: (row) => {
      return (
        <CellActions
          pathEdit={`/socials/quotes/edit/${row.id}`}
          pathDelete={`/socials/quotes/delete/${row.id}`}
        />
      )
    },
  },
]
