//- app/(admin)/manages/products/column.tsx

import { ColumnDef } from "@tanstack/react-table";
import { ManageProductList } from "./type";
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
import { CircleSmall, PackageCheck, PackageMinus, PackageX, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Columns: ColumnDef<ManageProductList>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => <CellImage src={row.original.thumbnail} alt={row.original.title} />,
  },
  {
    accessorKey: "title",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.title}</div>
          <Badge variant="outline" className="text-muted-foreground">
            SKU: {row.original.sku}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            <CellRating rating={row.original.rating} />
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    size: 200,
    cell: ({ row }) => {
      return (
        <div>{row.original.brand || "-"}</div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    cell: ({ row }) => <div className="capitalize">{row.original.category}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div>
          <span>$</span>
          {NumberFormated(row.original.price)}
        </div>
      )
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => {
      const stock = row.original.stock
      let iconStock = PackageCheck
      let textStock = ""
      let classStock = ""
      let colorStock = ""

      if (stock === 0) {
        iconStock = PackageX
        textStock = "Out of Stock"
        classStock = "text-neutral-400"
        colorStock = "Silver"
      } else if (stock < 10) {
        iconStock = PackageMinus
        textStock = "Low Stock"
        classStock = "text-red-600"
        colorStock = "red"
      } else {
        iconStock = PackageCheck
        textStock = "In Stock"
        classStock = "text-blue-600"
        colorStock = "blue"
      }

      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline">
            <CircleSmall color={colorStock} fill={colorStock} />
            <span className={classStock}>{textStock}</span>
          </Badge>
          <Badge variant="outline">
            <CellIcon icon={iconStock} text={NumberFormated(stock)} />
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => <CellList records={row.original.tags} />,
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <CellActions
          pathEdit={`/manages/products/edit/${id}`}
          pathDelete={`/manages/products/delete/${id}`}
        />
      )
    },
  },
]
