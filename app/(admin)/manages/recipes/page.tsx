//- app/(admin)/manages/recipes/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ManageRecipeListResp } from "./type"
import { ApiInternal, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { useCurl } from "@/lib/page"
import { Filters } from "./filters"

const getManageRecipeList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ManageRecipeListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/recipes/search?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const ManageRecipePage = () => {
  const breadcrumbItems = [
    { label: "Manages" },
    { label: "Recipes" },
  ]

  const {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    page,
    setPage,
    limit,
  } = useCurl()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 1000)
    return () => clearTimeout(handler)
  }, [search, setDebouncedSearch, setPage])

  const queries = useQueries({
    queries: [{
      queryKey: ["manages", "recipes", page, limit, debouncedSearch],
      queryFn: () => getManageRecipeList(page, limit, debouncedSearch),
      refetchOnWindowFocus: false,
    }],
  })
  const [queryRecipes] = queries
  const isLoading = queryRecipes.isLoading || queryRecipes.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Recipes"
          columns={Columns}
          data={queryRecipes.data?.recipes || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={queryRecipes.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          filters={Filters({ isLoading })}
        />
      </AppMain>
    </>
  )
}

export default ManageRecipePage
