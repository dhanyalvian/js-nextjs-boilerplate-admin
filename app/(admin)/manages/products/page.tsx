//- app/(admin)/manages/products/page.tsx

"use client"

import { ApiInternal, getParamSkip } from "@/components/api/client"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ManageProductListResp } from "./type"
import { ScrollToTop } from "@/lib/utils"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { useCurl } from "@/lib/page"

const getManageProductList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ManageProductListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/products/search?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const ManageProductPage = () => {
  const breadcrumbItems = [
    { label: "Manages" },
    { label: "Products" },
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
      queryKey: ["manages", "products", page, limit, debouncedSearch],
      queryFn: () => getManageProductList(page, limit, debouncedSearch),
      refetchOnWindowFocus: false,
    }],
  })
  const [queryProducts] = queries

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Post"
          columns={Columns}
          data={queryProducts.data?.products || []}
          isLoading={queryProducts.isLoading || queryProducts.isFetching}
          limit={limit}
          totalRows={queryProducts.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default ManageProductPage
