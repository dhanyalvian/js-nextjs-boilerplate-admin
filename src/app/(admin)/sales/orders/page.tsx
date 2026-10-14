//- src/app/(admin)/sales/orders/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { ReqSalesOrderFilter, RespSalesOrderList } from "./interface"
import { Suspense, useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetDataTableFilter, useDataTableApply } from "./filter"
import { GetSalesOrderFilter, GetSalesOrderList } from "./query"
import { DataTableFilterProps } from "@/components/core/data-table/interface"
import { CardStats } from "./card"
import { CardSectionStandard } from "@/components/core/card/section"

const breadcrumbItems = [
  { label: "Sales" },
  { label: "Order" },
]

const SalesOrderContent = () => {
  const [appliedFilter, setAppliedFilter] = useState<ReqSalesOrderFilter>({})
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
        queryFn: () => GetSalesOrderFilter(),
        queryKey: ["sales", "orders", "filter"],
        refetchOnWindowFocus: false,
      },
      {
        queryFn: () => GetSalesOrderList({
          page,
          limit,
          search: debouncedSearch,
          filters: appliedFilter,
        }),
        queryKey: [
          "sales",
          "orders",
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

  const [querySalesOrderFilter, querySalesOrderList] = queries
  const isLoading = querySalesOrderList.isLoading || querySalesOrderList.isFetching
  const isError = querySalesOrderList.error
  const records = querySalesOrderList.data?.records || []
  const pagination = querySalesOrderList.data?.pagination

  const handleListSearchFilterApply = useDataTableApply({
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
  })

  const SalesOrderListFilter: DataTableFilterProps = GetDataTableFilter({
    status: querySalesOrderFilter.data?.record?.status || [],
    paymentMethod: querySalesOrderFilter.data?.record?.paymentMethod || [],
    isLoading: querySalesOrderFilter.isLoading,
  })

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <CardSectionStandard cardStats={CardStats} isLoading={false} />

        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespSalesOrderList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada order."
            search={{
              searchValue: search,
              setSearch: setSearch,
              setPage: setPage,
              isLoading: isLoading,
            }}
            filters={SalesOrderListFilter}
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

const SalesOrderPage = () => {
  return (
    <Suspense fallback={null}>
      <SalesOrderContent />
    </Suspense>
  )
}

export default SalesOrderPage
