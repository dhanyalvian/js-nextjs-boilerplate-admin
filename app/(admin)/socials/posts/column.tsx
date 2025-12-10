//- app/(admin)/socials/posts/column.tsx

import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellList,
} from "@/components/core/data-table/columns"
import { NumberFormated } from "@/lib/numbers"
import { SocialPostList } from "./type"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, ThumbsDown, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const Columns: ColumnDef<SocialPostList>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 360,
  },
  {
    accessorKey: "body",
    header: "Body",
    size: 0,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 140,
    enableSorting: false,
    cell: ({ row }) => {
      return <CellList records={row.original.tags} />
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    size: 100,
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          <CellIcon icon={Eye} text={NumberFormated(row.original.views)} />
        </Badge>
      )
    },
  },
  {
    accessorKey: "reactions",
    header: "Reactions",
    size: 100,
    enableSorting: false,
    cell: ({ row }) => {
      const likes = NumberFormated(row.original.reactions.likes)
      const dislikes = NumberFormated(row.original.reactions.dislikes)

      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline">
            <CellIcon icon={ThumbsUp} text={likes} />
          </Badge>
          <Badge variant="outline">
            <CellIcon
              icon={ThumbsDown}
              text={dislikes}
              className="text-muted-foreground"
            />
          </Badge>
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
          pathEdit={`/socials/posts/edit/${row.original.id}`}
          pathDelete={`/socials/posts/delete/${row.original.id}`}
        />
      )
    },
  },
]
