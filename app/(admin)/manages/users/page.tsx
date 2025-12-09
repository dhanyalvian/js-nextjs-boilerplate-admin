//- app/(admin)/manages/users/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ManageUserListResp } from "./type"
import { ApiClient, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const getManageUserList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ManageUserListResp> => {
  const skip = getParamSkip(page, limit)
  const { data } = await ApiClient.get("/users/search?q=" + search, {
    params: {
      limit: limit,
      skip: skip,
      search: search,
    }
  })
  ScrollToTop()

  return data
}

const ManageUserPage = () => {
  const breadcrumbItems = [
    { label: "Manages" },
    { label: "Users" },
  ]

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [page, setPage] = useState(1)
  const limit = 20

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 1000)
    return () => clearTimeout(handler)
  }, [search])

  const queries = useQueries({
    queries: [
      {
        queryKey: ["manages", "users", page, limit, debouncedSearch],
        queryFn: () => getManageUserList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [queryUsers] = queries

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Post"
          columns={Columns}
          data={queryUsers.data?.users || []}
          isLoading={queryUsers.isLoading || queryUsers.isFetching}
          limit={limit}
          totalRows={queryUsers.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default ManageUserPage
