//- src/app/(admin)/socials/comments/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { RespSocialCommentList } from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetSocialCommentList = async ({
  page, limit, search,
}: GetListParams<unknown>): Promise<ApiResp<RespSocialCommentList>> => {
  const params = GetQueryParams({ page, limit, search })
  const data = await ApiInternal(`/comments?${params}`)
  ScrollToTop()

  return data
}
