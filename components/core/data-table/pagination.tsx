//- components/core/data-table/pagination.tsx

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
  const startRow = (currentPage - 1) * limit + 1;
  const endRow = Math.min(currentPage * limit, totalRecords);

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="w-full flex items-center justify-between pl-2 pr-2">
            <div className="text-xs font-normal">
              <span className="font-semibold">{totalRecords ? startRow : 0}-{endRow}</span>{` `}
              of <span className="font-semibold">{totalRecords}</span> records
            </div>

            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(1)}
                disabled={isLoading || currentPage === 1}
                className="rounded-full"
              >
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage - 1)}
                disabled={isLoading || currentPage === 1}
                className="rounded-full"
              >
                <ChevronLeft />
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={true}
                className="text-xs"
              >
                <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage + 1)}
                disabled={isLoading || currentPage === totalPages}
                className="rounded-full"
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(totalPages)}
                disabled={isLoading || currentPage === totalPages}
                className="rounded-full"
              >
                <ChevronsRight />
              </Button>
            </ButtonGroup>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}
