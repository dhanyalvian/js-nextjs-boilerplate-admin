//- app/socials/posts/page.tsx

"use client"

import { ApiClient, getParamSkip } from "@/components/api/client"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { ScrollToTop } from "@/lib/utils"
import { PostResp } from "@/types/social/post"
import { useQueries } from "@tanstack/react-query"
import { columns } from "./columns"
import { useState } from "react"

const getPostList = async (page: number, limit: number): Promise<PostResp> => {
  const skip = getParamSkip(page, limit)
  const { data } = await ApiClient.get("/posts", {
    params: {
      limit: limit,
      skip: skip,
    }
  })
  ScrollToTop()

  return data
}

const SocialsPostsPage = () => {
  const breadcrumbItems = [
    { label: "Socials" },
    { label: "Posts" },
  ]

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const limit = 20

  const queries = useQueries({
    queries: [
      {
        queryKey: ["socials", "posts", page, limit],
        queryFn: () => getPostList(page, limit),
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
          columns={columns}
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
