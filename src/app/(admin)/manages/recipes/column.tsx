//- src/app/(admin)/manages/recipes/column.tsx

import { RespManageRecipeList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellImagePopup,
  CellList,
  imageColumnSize,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"
import { Badge } from "@/components/ui/badge"
import { ChefHatIcon } from "@hugeicons/core-free-icons"

export const Columns: Column<RespManageRecipeList>[] = [
  {
    key: "image",
    header: "Image",
    size: imageColumnSize,
    // enableSorting: false,
    render: (row) => {
      return (
        <CellImagePopup
          src={row.image}
          alt={row.name}
          title={row.name + " | " + row.cuisine}
        />
      )
    }
  },
  {
    key: "name",
    header: "Name",
    size: 0,
    render: (row) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.name}</div>

          <Badge variant="outline">
            <CellIcon
              icon={ChefHatIcon}
              text={row.cuisine}
              className="text-muted-foreground"
            />
          </Badge>
        </div>
      )
    },
  },
  {
    key: "difficulty",
    header: "Difficulty",
    size: 120,
  },
  {
    key: "mealType",
    header: "Meal Type",
    size: 160,
    // enableSorting: false,
    render: (row) => <CellList records={row.mealType} max={4} />,
  },
  {
    key: "tags",
    header: "Tags",
    size: 200,
    // enableSorting: false,
    render: (row) => {
      return <CellList records={row.tags} max={4} />
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
          pathEdit={`/manages/recipes/edit/${row.id}`}
          pathDelete={`/manages/recipes/delete/${row.id}`}
        />
      )
    },
  },
]
