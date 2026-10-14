//- src/app/(admin)/socials/quotes/page.tsx

"use client"

import { useCurl } from "@/lib/api"
import { RespSocialQuoteList } from "./interface"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataError, DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { GetSocialQuoteList } from "./query"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Quote" },
]

const SocialQuotePage = () => {
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
        queryFn: () => GetSocialQuoteList({
          page,
          limit,
          search: debouncedSearch,
        }),
        queryKey: [
          "socials",
          "quotes",
          "list",
          page,
          limit,
          debouncedSearch,
        ],
        refetchOnWindowFocus: false,
      },
    ],
  })

  const [querySocialQuoteList] = queries
  const isLoading = querySocialQuoteList.isLoading || querySocialQuoteList.isFetching
  const isError = querySocialQuoteList.error
  const records = querySocialQuoteList.data?.records || []
  const pagination = querySocialQuoteList.data?.pagination

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        {isError ? (
          <DataError />
        ) : (
          <DataTable<RespSocialQuoteList>
            columns={Columns}
            data={records}
            isLoading={isLoading}
            emptyMessage="Belum ada quote."
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

export default SocialQuotePage
