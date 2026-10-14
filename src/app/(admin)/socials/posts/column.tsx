//- src/app/(admin)/socials/posts/column.tsx

import { RespSocialPostList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellList,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"
import { NumberFormatted } from "@/lib/number"
import { Badge } from "@/components/ui/badge"
import { ThumbsDown, ThumbsUp } from "@hugeicons/core-free-icons"

export const Columns: Column<RespSocialPostList>[] = [
  {
    key: "title",
    header: "Title",
    size: 360,
    render: (row) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.title}</div>
          <Badge variant="outline" className="text-muted-foreground">
            {NumberFormatted(row.views)} views
          </Badge>
        </div>
      )
    },
  },
  {
    key: "body",
    header: "Body",
    size: 0,
  },
  {
    key: "tags",
    header: "Tags",
    size: 180,
    // enableSorting: false,
    render: (row) => {
      return <CellList records={row.tags} max={3} />
    },
  },
  {
    key: "reactions",
    header: "Reactions",
    size: 100,
    // enableSorting: false,
    render: (row) => {
      const likes = NumberFormatted(row.likes)
      const dislikes = NumberFormatted(row.dislikes)

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
    key: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    // enableSorting: false,
    render: (row) => {
      return (
        <CellActions
          pathEdit={`/socials/posts/edit/${row.id}`}
          pathDelete={`/socials/posts/delete/${row.id}`}
        />
      )
    },
  },
]
