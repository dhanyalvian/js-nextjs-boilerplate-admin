//- components/core/data-table/tbody.tsx

import { TableCell, TableRow } from "@/components/ui/table"
import { Column } from "./interface"
import { HugeiconsIcon } from "@hugeicons/react"
import { ListXIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface DataTableTbodyProps<T> {
  columns: Column<T>[],
  data: T[],
  isLoading?: boolean,
  emptyMessage?: string,
}
export const DataTableTbody = <T extends object>({
  columns,
  data,
  isLoading,
  emptyMessage,
}: DataTableTbodyProps<T>) => {
  return (
    <tbody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i} className="border-b last:border-0">
            {columns.map((col) => (
              <TableCell key={col.key} className={cn("first:pl-3 last:pr-3 align-top", col.className)}>
                <div className="h-4 mt-0.5 mb-2 bg-muted animate-pulse rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-4 py-8 text-xs text-center text-muted-foreground/80"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-2 rounded-lg bg-muted mb-3">
                <HugeiconsIcon
                  icon={ListXIcon}
                  strokeWidth={1.5}
                  className="size-6 text-muted-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground/80">{emptyMessage}</p>
            </div>
          </td>
        </tr>
      ) : (
        data.map((row, i) => (
          <TableRow
            key={i}
            className="border-b last:border-0 hover:bg-muted/30 transition-colors"
          >
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className={cn("first:pl-3 last:pr-3 text-xs-plus align-top", col.className)}
              >
                {col.render
                  ? col.render(row)
                  : String((row as Record<string, unknown>)[col.key] ?? "-")}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </tbody>
  )
}
