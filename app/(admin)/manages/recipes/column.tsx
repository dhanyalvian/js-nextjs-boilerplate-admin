//- app/(admin)/manages/recipes/column.tsx

import { ColumnDef } from "@tanstack/react-table";
import { ManageRecipeList } from "./type";
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellImage,
  CellList,
  CellRating,
  imageColumnSize,
} from "@/components/core/data-table/columns";
import { NumberFormated } from "@/lib/numbers";
import { ChefHat, ClipboardCheck } from "lucide-react";

export const Columns: ColumnDef<ManageRecipeList>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => <CellImage src={row.original.image} alt={row.original.name} />,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      const review = NumberFormated(row.original.reviewCount)
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.name}</div>
          <div><CellIcon icon={ChefHat} text={row.original.cuisine} className="text-muted-foreground" /></div>
          <div className="flex items-center gap-3">
            <CellRating rating={row.original.rating} className="text-muted-foreground" />
            {/* <span>•</span> */}
            <CellIcon icon={ClipboardCheck} text={review} className="text-muted-foreground" />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    size: 120,
  },
  {
    accessorKey: "mealType",
    header: "Meal Type",
    size: 160,
    enableSorting: false,
    cell: ({ row }) => <CellList records={row.original.mealType} />,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => {
      return <CellList records={row.original.tags} />
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
          pathEdit={`/manages/recipes/edit/${row.original.id}`}
          pathDelete={`/manages/recipes/delete/${row.original.id}`}
        />
      )
    },
  },
]
