//- components/core/data-table/pagination.tsx

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { NumberFormated } from "@/lib/numbers"
import { ColumnDef } from "@tanstack/react-table"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface PaginationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  limit: number,
  totalRecords: number,
  totalPages: number,
  currentPage: number,
  setPage: (page: number) => void,
  isLoading?: boolean,
}

export const Pagination = <TData, TValue>({
  columns,
  limit,
  totalRecords,
  totalPages,
  currentPage,
  setPage,
  isLoading = false,
}: PaginationProps<TData, TValue>) => {
  const startRow = totalRecords ? ((currentPage - 1) * limit + 1) : 0
  const endRow = Math.min(currentPage * limit, totalRecords)

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="w-full flex items-center justify-between pl-2 pr-2">
            <div className="text-sm font-normal">
              <span className="font-semibold">{NumberFormated(startRow)}-{NumberFormated(endRow)}</span>{` `}
              of <span className="font-semibold">{NumberFormated(totalRecords)}</span> records
            </div>

            <ButtonGroup>
              <Button
                title="First"
                variant="outline"
                size="sm"
                onClick={() => setPage(1)}
                disabled={isLoading || currentPage === 1}
                className="rounded-full"
              >
                <ChevronFirst />
              </Button>
              <Button
                title="Previous"
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage - 1)}
                disabled={isLoading || currentPage === 1}
                className="rounded-full"
              >
                <ChevronLeft />
              </Button>

              <Button
                title="Page"
                variant="outline"
                size="sm"
                className="text-xs cursor-default"
              >
                <span className="font-semibold">{NumberFormated(currentPage)}</span>{` `}
                of <span className="font-semibold">{NumberFormated(totalPages)}</span>
              </Button>

              <Button
                title="Next"
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage + 1)}
                disabled={isLoading || currentPage === totalPages}
                className="rounded-full"
              >
                <ChevronRight />
              </Button>
              <Button
                title="Last"
                variant="outline"
                size="sm"
                onClick={() => setPage(totalPages)}
                disabled={isLoading || currentPage === totalPages}
                className="rounded-full"
              >
                <ChevronLast />
              </Button>
            </ButtonGroup>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}
