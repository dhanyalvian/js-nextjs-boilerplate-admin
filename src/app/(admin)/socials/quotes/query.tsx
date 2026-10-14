//- src/app/(admin)/socials/quotes/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { RespSocialQuoteList } from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetSocialQuoteList = async ({
  page, limit, search,
}: GetListParams<unknown>): Promise<ApiResp<RespSocialQuoteList>> => {
  const params = GetQueryParams({ page, limit, search })
  const data = await ApiInternal(`/quotes?${params}`)
  ScrollToTop()

  return data
}
