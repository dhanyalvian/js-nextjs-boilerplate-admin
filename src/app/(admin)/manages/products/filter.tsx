//- src/app/(admin)/manages/products/filter.tsx

import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { DropdownResp } from "@/types/response"
import { DashboardSquare01Icon, Tag01Icon } from "@hugeicons/core-free-icons"
import { useListSearchFilterApply } from "@/components/core/data-table/filters"
import { GetManageProductList } from "./query"
import { ReqManageProductFilter } from "./interface"

interface GetDataTableFilterProps {
  brand: DropdownResp[],
  category: DropdownResp[],
  isLoading: boolean,
}
export const GetDataTableFilter = ({
  brand,
  category,
  isLoading,
}: GetDataTableFilterProps): DataTableFilterProps => {
  return [
    // {
    //   type: "dateRange",
    //   key: "transactionDate",
    //   label: "Date",
    // },
    {
      type: "checkbox",
      id: "brand",
      label: "Brand",
      options: brand,
      isLoading: isLoading,
      icon: Tag01Icon,
      searchable: true,
    },
    {
      type: "checkbox",
      id: "category",
      label: "Category",
      options: category,
      isLoading: isLoading,
      icon: DashboardSquare01Icon,
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
  setAppliedFilter: (filters: ReqManageProductFilter) => void,
}
export const useDataTableApply = ({
  search,
  limit,
  setSearch,
  setPage,
  setDebouncedSearch,
  setAppliedFilter,
}: UseDataTableApplyProps) => {
  return useListSearchFilterApply<ReqManageProductFilter>({
    queryKeyBase: ["manages", "product", "list"],
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
    buildFilters: (filters) => {
      const nextFilters: ReqManageProductFilter = {}
      if (filters.brand?.length) nextFilters.brand = filters.brand
      if (filters.category?.length) nextFilters.category = filters.category
      return nextFilters
    },
    fetchList: GetManageProductList,
    errorMessage: "Failed to load data.",
  })
}
