//- components/core/data-table/table.tsx

import React, { FormEvent, useState } from "react"
import { Pagination } from "./pagination"
import { Table } from "@/components/ui/table"
import { DataTableThead } from "./thead"
import { DataTableTbody } from "./tbody"
import { DataTableSearch } from "./search"
import { DataTableFilterDateRangeValue, DataTableProps } from "./interface"
import { FilterCheckbox, FilterDateRange, FilterReset } from "./filters"
import { ButtonSubmit } from "../button"
import { FunnelIcon } from "@hugeicons/core-free-icons"

export const DataTable = <T extends object>({
  columns,
  data,
  isLoading,
  emptyMessage = "Tidak ada data",
  search,
  filters,
  pagination,
  onApply,
}: DataTableProps<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedDateRanges, setSelectedDateRanges] = useState<Record<string, DataTableFilterDateRangeValue>>({})

  const hasSearch = Boolean(search?.searchValue)
  const hasFilter = filters?.some((filter) =>
    filter.type === "checkbox"
      ? (selectedFilters[filter.id] ?? []).length > 0
      : Boolean(selectedDateRanges[filter.key]?.from),
  ) ?? false
  const hasActive = hasSearch || hasFilter
  const hasFilters = (filters?.length ?? 0) > 0
  const handleApply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onApply?.({
      filters: selectedFilters,
      dateRanges: selectedDateRanges,
    })
  }

  const handleReset = () => {
    search?.setSearch("")
    search?.setPage(1)
    setSelectedFilters({})
    setSelectedDateRanges({})
    onApply?.({
      filters: {},
      dateRanges: {},
      isReset: true,
    })
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl border shadow-xs">
      <form onSubmit={handleApply}>
        <div className="bg-header flex flex-row gap-2 p-2 justify-between items-center rounded-t-2xl">
          {search && (
            <DataTableSearch
              searchValue={search.searchValue}
              setSearch={search.setSearch}
              setPage={search.setPage}
              placeholder={search.placeholder}
              isLoading={isLoading}
            />
          )}

          {filters?.map((filter) =>
            filter.type === "checkbox" ? (
              <FilterCheckbox
                key={filter.id}
                id={filter.id}
                type={filter.type}
                label={filter.label}
                options={filter.options}
                searchable={filter.searchable}
                isLoading={isLoading}
                icon={filter.icon}
                selectedValues={selectedFilters[filter.id] ?? []}
                setSelectedValues={(values) =>
                  setSelectedFilters((prev) => ({ ...prev, [filter.id]: values }))
                }
              />
            ) : (
              <FilterDateRange
                key={filter.key}
                title={filter.label}
                disabled={isLoading}
                value={selectedDateRanges[filter.key] ?? {}}
                onChange={(value) =>
                  setSelectedDateRanges((prev) => ({ ...prev, [filter.key]: value }))
                }
              />
            ),
          )}

          {hasFilters && (
            <ButtonSubmit
              label="Apply"
              size="sm"
              className="mt-0 rounded-full text-xs-plus! text-white shadow-xs"
              iconLeft={FunnelIcon}
              disabled={isLoading || !hasActive}
            />
          )}

          {hasFilters && hasActive && (
            <FilterReset disabled={isLoading} onClick={handleReset} />
          )}

          <div className="ml-auto flex items-center gap-1.5">
            
          </div>
        </div>
      </form>

      <div>
        <Table className="border-t">
          <DataTableThead columns={columns} />
          {/* <Thead table={table} /> */}

          <DataTableTbody
            columns={columns}
            data={data}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
          {/* <Tbody table={table} columns={columns} isLoading={isLoading} /> */}

          {pagination && (
            // <DataTablePagination
            //   limit={pagination.limit}
            //   totalRecord={pagination.totalRecord}
            //   totalPage={pagination.totalPage}
            //   currentPage={pagination.currentPage}
            //   setPage={pagination.setPage}
            //   isLoading={isLoading}
            // />
            <Pagination
              columns={columns}
              limit={pagination.limit || 0}
              totalRecords={pagination.totalRecord || 0}
              totalPages={pagination.totalPage || 0}
              currentPage={pagination.currentPage || 0}
              setPage={pagination.setPage}
              isLoading={isLoading}
            />
          )}
        </Table>
      </div>
    </div>
  )
}

interface DataErrorProps {
  title?: string,
}
export const DataError = ({ title = "data" }: DataErrorProps) => {
  return (
    <section>
      <div className="text-center text-destructive">
        <p>Gagal memuat {title}</p>
      </div>
    </section>
  )
}
