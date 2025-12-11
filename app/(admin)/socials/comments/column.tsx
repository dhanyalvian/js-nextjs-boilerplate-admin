//- app/(admin)/socials/comments/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SocialCommentList } from "./type"
import { NumberFormated } from "@/lib/numbers"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
} from "@/components/core/data-table/columns"
import { Badge } from "@/components/ui/badge"

export const Columns: ColumnDef<SocialCommentList>[] = [
  {
    accessorKey: "body",
    header: "Comment",
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.body}</div>
          <Badge variant="outline" className="text-muted-foreground">
            {NumberFormated(row.original.likes)} likes
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "user",
    header: "User",
    size: 250,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <div>{row.original.user.fullName}</div>
          <div className="text-muted-foreground">
            @{row.original.user.username}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellActions
          pathEdit={`/socials/quotes/edit/${row.original.id}`}
          pathDelete={`/socials/quotes/delete/${row.original.id}`}
        />
      )
    },
  },
]
