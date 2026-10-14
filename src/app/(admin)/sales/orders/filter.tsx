//- src/app/(admin)/sales/orders/filter.tsx

import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { ReqSalesOrderFilter, RespSalesOrderFilter } from "./interface"
import { useListSearchFilterApply } from "@/components/core/data-table/filters"
import { GetSalesOrderList } from "./query"
import { DashboardSquare01Icon, SaleTag02Icon } from "@hugeicons/core-free-icons"

interface GetDataTableFilterProps extends RespSalesOrderFilter {
  isLoading: boolean,
}
export const GetDataTableFilter = ({
  status,
  paymentMethod,
  isLoading,
}: GetDataTableFilterProps): DataTableFilterProps => {
  return [
    {
      type: "checkbox",
      id: "status",
      label: "Status",
      options: status,
      isLoading: isLoading,
      icon: DashboardSquare01Icon,
      searchable: true,
    },
    {
      type: "checkbox",
      id: "paymentMethod",
      label: "Payment Method",
      options: paymentMethod,
      isLoading: isLoading,
      icon: SaleTag02Icon,
      searchable: true,
    },
  ]
}

interface UseDataTableApplyProps {
  search: string,
  limit: number,
  setSearch: (value: string) => void,
  setPage: (value: number) => void,
  setDebouncedSearch: (value: string) => void,
  setAppliedFilter: (filters: ReqSalesOrderFilter) => void,
}
export const useDataTableApply = ({
  search,
  limit,
  setSearch,
  setPage,
  setDebouncedSearch,
  setAppliedFilter,
}: UseDataTableApplyProps) => {
  return useListSearchFilterApply<ReqSalesOrderFilter>({
    queryKeyBase: ["sales", "orders", "list"],
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
    buildFilters: (filters) => {
      const nextFilters: ReqSalesOrderFilter = {}
      if (filters.status?.length) nextFilters.status = filters.status
      if (filters.paymentMethod?.length) nextFilters.paymentMethod = filters.paymentMethod
      return nextFilters
    },
    fetchList: GetSalesOrderList,
    errorMessage: "Failed to load data.",
  })
}
