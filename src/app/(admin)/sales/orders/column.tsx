//- src/app/(admin)/sales/orders/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SalesOrderListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
} from "@/components/core/data-table/columns"
import { Badge } from "@/components/ui/badge"
import {
  Clock01Icon,
  CouponPercentIcon,
  Invoice01Icon,
  SaleTag02Icon,
} from "@hugeicons/core-free-icons"
import { NumberFormatted } from "@/lib/number"
import { DateFormatted, TimeFormatted } from "@/lib/date"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, { border: string; dot: string; bg: string }> = {
  pending: {
    border: "border-yellow-400/50 text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-400",
    bg: "bg-yellow-400/10",
  },
  processing: {
    border: "border-blue-400/50 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-400",
    bg: "bg-blue-400/10",
  },
  completed: {
    border: "border-emerald-400/50 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-400",
    bg: "bg-emerald-400/10",
  },
  cancelled: {
    border: "border-red-400/50 text-red-600 dark:text-red-400",
    dot: "bg-red-400",
    bg: "bg-red-400/10",
  },
}

export const Columns: ColumnDef<SalesOrderListResp>[] = [
  {
    accessorKey: "orderNo",
    header: "Order",
    size: 180,
    cell: ({ row }) => {
      const status = row.original.status
      const styles = statusStyles[status]

      return (
        <div className="flex flex-col gap-1">
          <div className="font-medium">{row.original.orderNo}</div>
          <Badge
            variant="outline"
            className={cn("capitalize", styles?.border, styles?.bg)}
          >
            <span className={cn("size-2 rounded-full", styles?.dot)}></span>
            {status}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "orderDate",
    header: "Date",
    size: 160,
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <CellIcon
          icon={Invoice01Icon}
          text={DateFormatted(row.original.orderDate)}
        />
        <CellIcon
          icon={Clock01Icon}
          text={TimeFormatted(row.original.orderDate)}
        />
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    size: 0,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.customerName}</span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    size: 160,
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    size: 120,
    enableSorting: false,
    cell: ({ row }) => {
      const totalDiscount = row.original.totalDiscount

      return (
        <div className="flex flex-col gap-1">
          <CellIcon
            icon={SaleTag02Icon}
            text={`$${NumberFormatted(row.original.totalPrice)}`}
          />

          {totalDiscount > 0 && (
            <CellIcon
              icon={CouponPercentIcon}
              text={`$${NumberFormatted(totalDiscount)}`}
              className="text-muted-foreground"
            />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "finalPrice",
    header: "Grand Total",
    size: 120,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div>
          <span>$</span>
          {NumberFormatted(row.original.finalPrice)}
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
