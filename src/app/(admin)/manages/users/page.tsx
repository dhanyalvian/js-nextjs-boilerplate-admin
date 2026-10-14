//- src/app/(admin)/manages/users/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { ReqManageUserFilter, RespManageUserList } from "./interface"
import { Suspense, useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetDataTableFilter, useDataTableApply } from "./filter"
import { GetManageUserList } from "./query"
import { DataTableFilterProps } from "@/components/core/data-table/interface"

const breadcrumbItems = [
  { label: "Manages" },
  { label: "User" },
]

const ManageUserContent = () => {
  const [appliedFilter, setAppliedFilter] = useState<ReqManageUserFilter>({})
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
        queryFn: () => GetManageUserList({
          page,
          limit,
          search: debouncedSearch,
          filters: appliedFilter,
        }),
        queryKey: [
          "manages",
          "users",
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

  const [queryManageUserList] = queries
  const isLoading = queryManageUserList.isLoading || queryManageUserList.isFetching
  const isError = queryManageUserList.error
  const records = queryManageUserList.data?.records || []
  const pagination = queryManageUserList.data?.pagination

  const handleListSearchFilterApply = useDataTableApply({
    search,
    limit,
    setSearch,
    setPage,
    setDebouncedSearch,
    setAppliedFilter,
  })

  const ManageUserListFilter: DataTableFilterProps = GetDataTableFilter({
    isLoading: isLoading,
  })

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespManageUserList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada user."
            search={{
              searchValue: search,
              setSearch: setSearch,
              setPage: setPage,
              isLoading: isLoading,
            }}
            filters={ManageUserListFilter}
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

const ManageUserPage = () => {
  return (
    <Suspense fallback={null}>
      <ManageUserContent />
    </Suspense>
  )
}

export default ManageUserPage
