//- src/app/(admin)/socials/posts/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { RespSocialPostList } from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetSocialPostList = async ({
  page, limit, search,
}: GetListParams<unknown>): Promise<ApiResp<RespSocialPostList>> => {
  const params = GetQueryParams({ page, limit, search })
  const data = await ApiInternal(`/posts?${params}`)
  ScrollToTop()

  return data
}
