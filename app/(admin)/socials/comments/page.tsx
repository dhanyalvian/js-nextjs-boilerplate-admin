//- app/(admin)/socials/comments/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { SocialCommentListResp } from "./type"
import { ApiClient, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const GetSocialCommentList = async (
  page: number,
  limit: number,
  search: string,
): Promise<SocialCommentListResp> => {
  const skip = getParamSkip(page, limit)
  const { data } = await ApiClient.get("/comments?q=" + search, {
    params: {
      limit: limit,
      skip: skip,
      search: search,
    }
  })
  ScrollToTop()

  return data
}

const SocialCommentPage = () => {
  const breadcrumbItems = [
    { label: "Socials" },
    { label: "Comments" },
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
        queryKey: ["socials", "comments", page, limit, debouncedSearch],
        queryFn: () => GetSocialCommentList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySocialComments] = queries

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Comment"
          columns={Columns}
          data={querySocialComments.data?.comments || []}
          isLoading={querySocialComments.isLoading || querySocialComments.isFetching}
          limit={limit}
          totalRows={querySocialComments.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialCommentPage
