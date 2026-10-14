//- src/app/(admin)/socials/comments/column.tsx

import { RespSocialCommentList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"
import { NumberFormatted } from "@/lib/number"
import { Badge } from "@/components/ui/badge"

export const Columns: Column<RespSocialCommentList>[] = [
  {
    key: "body",
    header: "Comment",
    size: 0,
    render: (row) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.body}</div>
          <Badge variant="outline" className="text-muted-foreground">
            {NumberFormatted(row.likes)} likes
          </Badge>
        </div>
      )
    },
  },
  {
    key: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    // enableSorting: false,
    render: (row) => {
      return (
        <CellActions
          pathEdit={`/socials/comments/edit/${row.id}`}
          pathDelete={`/socials/comments/delete/${row.id}`}
        />
      )
    },
  },
]
