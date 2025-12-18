//- app/(admin)/socials/posts/page.tsx

"use client"

import { ApiInternal, getParamSkip } from "@/components/api/client"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { ScrollToTop } from "@/lib/utils"
import { SocialPostListResp } from "./type"
import { Columns } from "./column"
import { useQueries } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const getSocialPostList = async (
  page: number,
  limit: number,
  search: string,
): Promise<SocialPostListResp> => {
  const skip = getParamSkip(page, limit)
  const data = await ApiInternal(`/posts/search?q=${search}&limit=${limit}&skip=${skip}`)
  ScrollToTop()

  return data
}

const SocialsPostsPage = () => {
  const breadcrumbItems = [
    { label: "Socials" },
    { label: "Posts" },
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
        queryKey: ["socials", "posts", page, limit, debouncedSearch],
        queryFn: () => getSocialPostList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [queryPosts] = queries

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          title="Post"
          columns={Columns}
          data={queryPosts.data?.posts || []}
          isLoading={queryPosts.isLoading || queryPosts.isFetching}
          limit={limit}
          totalRows={queryPosts.data?.total ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialsPostsPage
