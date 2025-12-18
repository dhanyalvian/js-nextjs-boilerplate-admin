//- app/(admin)/socials/quotes/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { SocialQuoteListResp } from "./type"
import { ApiInternal, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const GetSocialQuoteList = async (
  page: number,
  limit: number,
  search: string,
): Promise<SocialQuoteListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/quotes?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const SocialQuotePage = () => {
  const breadcrumbItems = [
    { label: "Socials" },
    { label: "Quotes" },
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
        queryKey: ["socials", "quotes", page, limit, debouncedSearch],
        queryFn: () => GetSocialQuoteList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySocialQuotes] = queries

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Quote"
          columns={Columns}
          data={querySocialQuotes.data?.quotes || []}
          isLoading={querySocialQuotes.isLoading || querySocialQuotes.isFetching}
          limit={limit}
          totalRows={querySocialQuotes.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialQuotePage
