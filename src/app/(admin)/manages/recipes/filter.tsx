//- src/app/(admin)/manages/recipes/filter.tsx

import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { ReqManageRecipeFilter, RespManageRecipeFilter } from "./interface"
import { useListSearchFilterApply } from "@/components/core/data-table/filters"
import { GetManageRecipeList } from "./query"
import { FilterVerticalIcon, RacingFlagIcon, UtensilsIcon } from "@hugeicons/core-free-icons"

interface GetDataTableFilterProps extends RespManageRecipeFilter {
  isLoading: boolean,
}
export const GetDataTableFilter = ({
  cuisine,
  difficulty,
  mealType,
  isLoading,
}: GetDataTableFilterProps): DataTableFilterProps => {
  return [
    {
      type: "checkbox",
      id: "cuisine",
      label: "Cuisine",
      options: cuisine,
      isLoading: isLoading,
      icon: RacingFlagIcon,
    },
    {
      type: "checkbox",
      id: "difficulty",
      label: "Difficulty",
      options: difficulty,
      isLoading: isLoading,
      icon: FilterVerticalIcon,
    },
    {
      type: "checkbox",
      id: "mealType",
      label: "Meal Type",
      options: mealType,
      isLoading: isLoading,
      icon: UtensilsIcon,
    },
  ]
}

interface UseDataTableApplyProps {
  search: string,
  limit: number,
  setSearch: (value: string) => void,
  setPage: (value: number) => void,
  setDebouncedSearch: (value: string) => void,
  setAppliedFilter: (filters: ReqManageRecipeFilter) => void,
}
export const useDataTableApply = ({
  search,
  limit,
  setSearch,
  setPage,
  setDebouncedSearch,
  setAppliedFilter,
}: UseDataTableApplyProps) => {
  return useListSearchFilterApply<ReqManageRecipeFilter>({
    queryKeyBase: ["manages", "product", "list"],
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
    buildFilters: (filters) => {
      const nextFilters: ReqManageRecipeFilter = {}
      if (filters.cuisine?.length) nextFilters.cuisine = filters.cuisine
      if (filters.difficulty?.length) nextFilters.difficulty = filters.difficulty
      if (filters.mealType?.length) nextFilters.mealType = filters.mealType
      return nextFilters
    },
    fetchList: GetManageRecipeList,
    errorMessage: "Failed to load data.",
  })
}
