//- src/app/(admin)/manages/products/column.tsx

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
import { Badge } from "@/components/ui/badge"
import {
  PackageReceive01Icon,
  PackageRemove01Icon,
  PackageSent01Icon,
} from "@hugeicons/core-free-icons"
import { NumberFormatted } from "@/lib/number"
import { RespManageProductList } from "./interface"
import { Column } from "@/components/core/data-table/interface"

export const Columns: Column<RespManageProductList>[] = [
  {
    key: "thumbnail",
    header: "Image",
    size: imageColumnSize,
    render: (row) => {
      return (
        <CellImagePopup
          src={row.thumbnail}
          alt={row.name}
          title={row.name}
        />
      )
    },
  },
  {
    key: "name",
    header: "Name",
    render: (row) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.name}</div>
          <Badge variant="outline" className="text-muted-foreground">
            SKU: {row.sku}
          </Badge>
        </div>
      )
    },
  },
  {
    key: "brand",
    header: "Brand",
    size: 150,
    render: ( row ) => {
      return (
        <div>{row.brand || "-"}</div>
      )
    },
  },
  {
    key: "category",
    header: "Category",
    size: 200,
    render: (row) => <div className="capitalize">{row.category}</div>,
  },
  {
    key: "price",
    header: "Price",
    size: 130,
    render: ( row ) => {
      return (
        <div>
          <span>$</span>
          {NumberFormatted(row.price)}
        </div>
      )
    },
  },
  {
    key: "stock",
    header: "Stock",
    size: 130,
    render: ( row ) => {
      const stock = row.stock
      let iconStock = PackageSent01Icon
      let classStock = ""
      let classBorder = ""

      if (stock < 1) {
        iconStock = PackageRemove01Icon
        classStock = "text-neutral-400"
        classBorder = "border-neutral-200"
      } else if (stock < 10) {
        iconStock = PackageReceive01Icon
        classStock = "text-red-600"
        classBorder = "border-red-200"
      } else {
        classStock = "text-blue-600"
        classBorder = "border-blue-200"
      }

      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className={classBorder}>
            <CellIcon
              icon={iconStock}
              text={NumberFormatted(stock)}
              className={classStock}
            />
          </Badge>
        </div>
      )
    },
  },
  {
    key: "tags",
    header: "Tags",
    size: 180,
    render: ( row ) => <CellList records={row.tags} max={4} />,
  },
  {
    key: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    render: ( row ) => {
      const id = row.id
      return (
        <CellActions
          pathEdit={`/manages/products/edit/${id}`}
          pathDelete={`/manages/products/delete/${id}`}
        />
      )
    },
  },
]
