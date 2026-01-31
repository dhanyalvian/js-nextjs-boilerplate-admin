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
import { UserLockIcon, VenusAndMarsIcon } from "lucide-react"
import {
  FilterDateRange,
  FilterCheckbox,
  FilterDate,
} from "@/components/core/data-table/filters"

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
  const isLoading = queryUsers.isLoading || queryUsers.isFetching

  const filters = (
    <>
      {FilterCheckbox({
        Icon: VenusAndMarsIcon,
        title: "Gender",
        data: [
          { value: "M", label: "Male" },
          { value: "F", label: "Female" },
        ],
        isLoading: isLoading,
      })}
      {FilterDate({
        title: "Date of birth",
        disabled: isLoading,
      })}
      {FilterDateRange({
        title: "Date of birth",
        disabled: isLoading,
      })}
      {FilterCheckbox({
        Icon: UserLockIcon,
        title: "Role",
        data: [
          { value: "admin", label: "Admin" },
          { value: "moderator", label: "Moderator" },
          { value: "user", label: "User" },
        ],
        searchable: true,
        isLoading: isLoading,
      })}
    </>
  )

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Post"
          columns={Columns}
          data={queryUsers.data?.users || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={queryUsers.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          filters={filters}
        />
      </AppMain>
    </>
  )
}

export default ManageUserPage
