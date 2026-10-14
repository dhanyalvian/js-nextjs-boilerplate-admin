//- src/app/(admin)/sales/orders/column.tsx

import { RespSalesOrderList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"
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

export const Columns: Column<RespSalesOrderList>[] = [
  {
    key: "orderNo",
    header: "Order",
    size: 180,
    render: (row) => {
      const status = row.status
      const styles = statusStyles[status]

      return (
        <div className="flex flex-col gap-1">
          <div className="font-medium">{row.orderNo}</div>
          <Badge
            variant="outline"
            className={cn("capitalize", styles?.border, styles?.bg)}
          >
            <span className={cn("size-2 rounded-full", styles?.dot)}></span>
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    key: "orderDate",
    header: "Date",
    size: 160,
    render: (row) => (
      <div className="flex flex-col gap-1">
        <CellIcon
          icon={Invoice01Icon}
          text={DateFormatted(row.orderDate)}
        />
        <CellIcon
          icon={Clock01Icon}
          text={TimeFormatted(row.orderDate)}
        />
      </div>
    ),
  },
  {
    key: "customerName",
    header: "Customer Name",
    size: 0,
    render: (row) => (
      <span className="font-medium">{row.customerName}</span>
    ),
  },
  {
    key: "paymentMethod",
    header: "Payment Method",
    size: 160,
  },
  {
    key: "totalPrice",
    header: "Price",
    size: 120,
    // enableSorting: false,
    render: (row) => {
      const totalDiscount = row.totalDiscount

      return (
        <div className="flex flex-col gap-1">
          <CellIcon
            icon={SaleTag02Icon}
            text={`$${NumberFormatted(row.totalPrice)}`}
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
    key: "finalPrice",
    header: "Grand Total",
    size: 120,
    // enableSorting: false,
    render: (row) => {
      return (
        <div>
          <span>$</span>
          {NumberFormatted(row.finalPrice)}
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
      const id = row.id
      return (
        <CellActions
          pathEdit={`/sales/orders/edit/${id}`}
          pathDelete={`/sales/orders/delete/${id}`}
        />
      )
    },
  },
]
