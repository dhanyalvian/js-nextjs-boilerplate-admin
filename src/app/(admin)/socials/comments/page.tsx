//- src/app/(admin)/socials/comments/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { RespSocialCommentList } from "./interface"
import { Suspense, useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetSocialCommentList } from "./query"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Comment" },
]

const SocialCommentContent = () => {
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
        queryFn: () => GetSocialCommentList({
          page,
          limit,
          search: debouncedSearch,
        }),
        queryKey: [
          "socials",
          "comments",
          "list",
          page,
          limit,
          debouncedSearch,
        ],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const [querySocialCommentList] = queries
  const isLoading = querySocialCommentList.isLoading || querySocialCommentList.isFetching
  const isError = querySocialCommentList.error
  const records = querySocialCommentList.data?.records || []
  const pagination = querySocialCommentList.data?.pagination

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespSocialCommentList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada comment."
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

const SocialCommentPage = () => {
  return (
    <Suspense fallback={null}>
      <SocialCommentContent />
    </Suspense>
  )
}

export default SocialCommentPage
