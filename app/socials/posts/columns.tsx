//- app/socials/posts/columns.tsx

import { actionColDelSize, actionColHeader, actionColKey, actionColSize, ActionDelete, Actions, iconSize } from "@/components/core/data-table/columns"
import { Badge } from "@/components/ui/badge"
import { NumberFormated } from "@/lib/numbers"
import { PostList } from "@/types/social/post"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, ThumbsDown, ThumbsUp } from "lucide-react"

export const columns: ColumnDef<PostList>[] = [
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
    size: 160,
    enableSorting: false,
    cell: ({ row }) => {
      const tags = row.original.tags
      return (
        <ul className="table-ul">
          {tags.map((item, idx) => (
            <li key={idx} className="table-ul-li">{item}</li>
          ))}
        </ul>
      )
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    size: 100,
    cell: ({ row }) => {
      const views = NumberFormated(row.original.views)
      return (
        <Badge variant="outline">
          <Eye size={iconSize} />
          {views}
        </Badge>
      )
    },
  },
  {
    accessorKey: "reactions",
    header: "Reactions",
    size: 80,
    enableSorting: false,
    cell: ({ row }) => {
      const likes = NumberFormated(row.original.reactions.likes)
      const dislikes = NumberFormated(row.original.reactions.dislikes)

      return (
        <div className="flex flex-col gap-0.5">
          <Badge variant="outline">
            <ThumbsUp />
            <span className="text-xs">{likes}</span>
          </Badge>
          <Badge variant="outline">
            <ThumbsDown />
            <span className="text-xs">{dislikes}</span>
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
        <Actions
          pathEdit={`/socials/posts/edit/${row.original.id}`}
          pathDelete={`/socials/posts/delete/${row.original.id}`}
        />
      )
    },
  },
]
