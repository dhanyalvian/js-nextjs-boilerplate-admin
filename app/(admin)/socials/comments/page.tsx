//- app/(admin)/socials/comments/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { SocialCommentListResp } from "./type"
import { ApiInternal, getParamSkip } from "@/components/api/client"
import { ScrollToTop } from "@/lib/utils"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { useCurl } from "@/lib/page"

const GetSocialCommentList = async (
  page: number,
  limit: number,
  search: string,
): Promise<SocialCommentListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/comments?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const SocialCommentPage = () => {
  const breadcrumbItems = [
    { label: "Socials" },
    { label: "Comments" },
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
      queryKey: ["socials", "comments", page, limit, debouncedSearch],
      queryFn: () => GetSocialCommentList(page, limit, debouncedSearch),
      refetchOnWindowFocus: false,
    }],
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
