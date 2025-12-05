//- app/(admin)/socials/comments/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SocialCommentList } from "./type"
import { NumberFormated } from "@/lib/numbers"
import { ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { actionColHeader, actionColKey, actionColSize, CellActions } from "@/components/core/data-table/columns"

export const Columns: ColumnDef<SocialCommentList>[] = [
  {
    accessorKey: "body",
    header: "Comment",
    size: 0,
  },
  {
    accessorKey: "user",
    header: "User",
    size: 250,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <div>{row.original.user.fullName}</div>
          <div className="text-muted-foreground">@{row.original.user.username}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "likes",
    header: "Likes",
    size: 100,
    cell: ({ row }) => {
      const likes = NumberFormated(row.original.likes)
      return (
        <Badge variant="outline">
          <ThumbsUp />
          {likes}
        </Badge>
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
