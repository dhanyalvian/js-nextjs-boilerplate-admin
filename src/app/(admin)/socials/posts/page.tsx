//- src/app/(admin)/socials/posts/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { RespSocialPostList } from "./interface"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetSocialPostList } from "./query"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Post" },
]

const SocialPostPage = () => {
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
        queryFn: () => GetSocialPostList({
          page,
          limit,
          search: debouncedSearch,
        }),
        queryKey: [
          "socials",
          "posts",
          "list",
          page,
          limit,
          debouncedSearch,
        ],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const [querySocialPostList] = queries
  const isLoading = querySocialPostList.isLoading || querySocialPostList.isFetching
  const isError = querySocialPostList.error
  const records = querySocialPostList.data?.records || []
  const pagination = querySocialPostList.data?.pagination

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespSocialPostList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada post."
            search={{
              searchValue: search,
              setSearch: setSearch,
              setPage: setPage,
              isLoading: isLoading,
            }}
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

export default SocialPostPage
