//- components/core/data-table/thead.tsx

import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Column } from "./interface"
import { cn } from "@/lib/utils"

interface DataTableTheadProps<T> {
  columns: Column<T>[],
}
export const DataTableThead = <T extends object>({ columns }: DataTableTheadProps<T>) => {
  return (
    <TableHeader className="bg-header">
      <TableRow>
        {columns.map((col) => (
          <TableHead
            key={col.key}
            className={cn(
              "first:pl-3 last:pr-3 text-xs-plus font-medium",
              col.className,
            )}
            style={col.size ? { width: `${col.size}px` } : undefined}
          >
            {col.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
