//- app/(admin)/manages/users/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ManageUserListResp } from "./type"
import { ApiInternal, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { useCurl } from "@/lib/page"

const getManageUserList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ManageUserListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/users/search?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const ManageUserPage = () => {
  const breadcrumbItems = [
    { label: "Manages" },
    { label: "Users" },
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
      queryKey: ["manages", "users", page, limit, debouncedSearch],
      queryFn: () => getManageUserList(page, limit, debouncedSearch),
      refetchOnWindowFocus: false,
    }],
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
