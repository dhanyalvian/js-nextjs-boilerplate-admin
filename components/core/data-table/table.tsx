//- components/core/data-table/table.tsx

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import React from "react"
import { Pagination } from "./pagination"
import { Table } from "@/components/ui/table"
import { Exports, Search } from "./search-filter"
import { Thead } from "./thead"
import { Tbody } from "./tbody"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  isLoading?: boolean,
  limit: number,
  totalRows: number,
  page: number,
  setPage: (page: number) => void,
  searchPlaceholder?: string,
  search: string,
  setSearch: (value: string) => void,
  filters?: React.ReactNode,
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  limit,
  totalRows,
  page,
  setPage,
  searchPlaceholder = "Pencarian...",
  search = "",
  setSearch,
  filters,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility] = React.useState<VisibilityState>({})
  const totalPages = Math.ceil(totalRows / limit)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }
  const handleSearchClear = () => {
    setSearch("")
    setPage(1)
  }

  const table = useReactTable({
    data: data,
    columns: columns,
    defaultColumn: {
      minSize: 5,
      size: 100,
      maxSize: 500,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: totalPages,
    manualFiltering: true,
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-between items-center">
        <Search
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          isLoading={isLoading}
          filters={filters}
        />

        <Exports />
      </div>

      <div className="bg-white rounded-xl border shadow-xs">
        <Table>
          <Thead table={table} />

          <Tbody table={table} columns={columns} isLoading={isLoading} />

          <Pagination
            columns={columns}
            limit={limit}
            totalRecords={totalRows}
            totalPages={totalPages}
            currentPage={page}
            setPage={setPage}
            isLoading={isLoading}
          />
        </Table>
      </div>
    </div>
  )
}
