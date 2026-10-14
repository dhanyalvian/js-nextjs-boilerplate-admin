//- src/app/(admin)/manages/users/filter.tsx

import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { ReqManageUserFilter } from "./interface"
import { useListSearchFilterApply } from "@/components/core/data-table/filters"
import { GetManageUserList } from "./query"
import { DropdownResp } from "@/types/response"
import { UserMultiple03Icon } from "@hugeicons/core-free-icons"

const GenderOptions: DropdownResp[] = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
]

interface GetDataTableFilterProps {
  isLoading: boolean,
}
export const GetDataTableFilter = ({
  isLoading,
}: GetDataTableFilterProps): DataTableFilterProps => {
  return [
    {
      type: "checkbox",
      id: "gender",
      label: "Gender",
      options: GenderOptions,
      isLoading: isLoading,
      icon: UserMultiple03Icon,
    },
  ]
}

interface UseDataTableApplyProps {
  search: string,
  limit: number,
  setSearch: (value: string) => void,
  setPage: (value: number) => void,
  setDebouncedSearch: (value: string) => void,
  setAppliedFilter: (filters: ReqManageUserFilter) => void,
}
export const useDataTableApply = ({
  search,
  limit,
  setSearch,
  setPage,
  setDebouncedSearch,
  setAppliedFilter,
}: UseDataTableApplyProps) => {
  return useListSearchFilterApply<ReqManageUserFilter>({
    queryKeyBase: ["manages", "users", "list"],
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
    buildFilters: (filters) => {
      const nextFilters: ReqManageUserFilter = {}
      if (filters.gender?.length) nextFilters.gender = filters.gender
      return nextFilters
    },
    fetchList: GetManageUserList,
    errorMessage: "Failed to load data.",
  })
}
