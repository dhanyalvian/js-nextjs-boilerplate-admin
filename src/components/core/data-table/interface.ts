//- src/components/core/data-table/interface.ts

import { IconSvgElement } from "@hugeicons/react"

export interface DataTableProps<T> {
  columns: Column<T>[],
  data: T[],
  isLoading?: boolean,
  emptyMessage?: string,
  className?: string,
  search?: DataTableSearchProps,
  filters?: DataTableFilterProps,
  pagination?: DataTablePaginationProps,
  onApply?: (payload: DataTableApplyPayload) => void,
}

export interface Column<T> {
  key: string,
  header: string,
  size?: number,
  render?: (row: T) => React.ReactNode,
  className?: string,
}

export interface DataTableSearchProps {
  searchValue: string,
  setSearch: (value: string) => void,
  setPage: (value: number) => void,
  placeholder?: string,
  isLoading?: boolean,
}

export type DataTableFilterProps = (
  DataTableFilterCheckboxProps | DataTableFilterDateRangeProps
)[]

export interface DataTableFilterCheckboxProps {
  id: string,
  type: "checkbox",
  label: string,
  options: DataTableFilterOptionProps[],
  searchable?: boolean,
  isLoading?: boolean,
  icon?: IconSvgElement,
}

export interface DataTableFilterDateRangeProps {
  type: "dateRange",
  key: string,
  label: string,
}

export interface DataTableFilterOptionProps {
  label: string,
  value: string,
}

export interface DataTablePaginationProps {
  limit?: number,
  totalRecord: number,
  totalPage: number,
  currentPage: number,
  setPage: (page: number) => void,
}

export interface DataTableApplyPayload {
  filters: Record<string, string[]>,
  dateRanges: Record<string, DataTableFilterDateRangeValue>,
  isReset?: boolean,
}

export interface DataTableFilterDateRangeValue {
  from?: Date,
  to?: Date,
}
