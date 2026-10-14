//- src/app/(admin)/manages/recipes/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { ReqManageRecipeFilter, RespManageRecipeList } from "./interface"
import { Suspense, useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetDataTableFilter, useDataTableApply } from "./filter"
import { GetManageRecipeFilter, GetManageRecipeList } from "./query"
import { DataTableFilterProps } from "@/components/core/data-table/interface"

const breadcrumbItems = [
  { label: "Manages" },
  { label: "Recipe" },
]

const ManageRecipeContent = () => {
  const [appliedFilter, setAppliedFilter] = useState<ReqManageRecipeFilter>({})
  const {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    limit,
    page,
    setPage,
  } = useCurl()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 1000)
    return () => clearTimeout(handler)
  }, [search, setDebouncedSearch, setPage])

  const queries = useQueries({
    queries: [
      {
        queryFn: () => GetManageRecipeFilter(),
        queryKey: ["manages", "recipes", "filter"],
        refetchOnWindowFocus: false,
      },
      {
        queryFn: () => GetManageRecipeList({
          page,
          limit,
          search: debouncedSearch,
          filters: appliedFilter,
        }),
        queryKey: [
          "manages",
          "recipes",
          "list",
          page,
          limit,
          debouncedSearch,
          JSON.stringify(appliedFilter),
        ],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const [queryManageRecipeFilter, queryManageRecipeList] = queries
  const isLoading = queryManageRecipeList.isLoading || queryManageRecipeList.isFetching
  const isError = queryManageRecipeList.error
  const records = queryManageRecipeList.data?.records || []
  const pagination = queryManageRecipeList.data?.pagination

  const handleListSearchFilterApply = useDataTableApply({
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
  })

  const ManageRecipeListFilter: DataTableFilterProps = GetDataTableFilter({
    cuisine: queryManageRecipeFilter.data?.record?.cuisine || [],
    difficulty: queryManageRecipeFilter.data?.record?.difficulty || [],
    mealType: queryManageRecipeFilter.data?.record?.mealType || [],
    isLoading: queryManageRecipeFilter.isLoading,
  })

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespManageRecipeList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada kategori."
            search={{
              searchValue: search,
              setSearch: setSearch,
              setPage: setPage,
              isLoading: isLoading,
            }}
            filters={ManageRecipeListFilter}
            onApply={handleListSearchFilterApply}
            pagination={{
              limit: limit,
              totalRecord: pagination?.totalRecord || 0,
              totalPage: pagination?.totalPage || 0,
              currentPage: page,
              setPage: setPage,
            }}
          />
        )}
      </AppMain>
    </>
  )
}

const ManageRecipePage = () => {
  return (
    <Suspense fallback={null}>
      <ManageRecipeContent />
    </Suspense>
  )
}

export default ManageRecipePage
