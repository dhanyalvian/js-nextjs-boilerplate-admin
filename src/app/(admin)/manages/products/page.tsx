//- src/app/(admin)/manages/products/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { ReqManageProductFilter, RespManageProductList } from "./interface"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { GetManageProductFilter, GetManageProductList } from "./query"
import { Columns } from "./column"
import { GetDataTableFilter, useDataTableApply } from "./filter"

const breadcrumbItems = [
  { label: "Manages" },
  { label: "Product" },
]

const ManageProductPage = () => {
  const [appliedFilter, setAppliedFilter] = useState<ReqManageProductFilter>({})

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
      // setPage(1)
    }, 1000)
    return () => clearTimeout(handler)
  }, [search, setDebouncedSearch, setPage])

  const queries = useQueries({
    queries: [
      {
        queryFn: () => GetManageProductFilter(),
        queryKey: ["manages", "products", "filter"],
        refetchOnWindowFocus: false,
      },
      {
        queryFn: () => GetManageProductList({ page, limit, search: debouncedSearch, filters: appliedFilter }),
        queryKey: ["manages", "products", "list", page, limit, debouncedSearch, JSON.stringify(appliedFilter)],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const [queryManageProductFilter, queryManageProductList] = queries
  const isLoading = queryManageProductList.isLoading || queryManageProductList.isFetching
  const isError = queryManageProductList.error
  const records = queryManageProductList.data?.records || []
  const pagination = queryManageProductList.data?.pagination

  const handleListSearchFilterApply = useDataTableApply({
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
  })

  const ManageProductListFilter: DataTableFilterProps = GetDataTableFilter({
    brand: queryManageProductFilter.data?.record?.brand || [],
    category: queryManageProductFilter.data?.record?.category || [],
    isLoading: queryManageProductFilter.isLoading,
  })

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespManageProductList>
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
            filters={ManageProductListFilter}
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

export default ManageProductPage
