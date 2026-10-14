//- src/app/(admin)/manages/users/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { ReqManageUserFilter, RespManageUserList } from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetManageUserList = async ({
  page, limit, search, filters,
}: GetListParams<ReqManageUserFilter>): Promise<ApiResp<RespManageUserList>> => {
  const params = GetQueryParams<ReqManageUserFilter>({ page, limit, search, filters })
  const data = await ApiInternal(`/users?${params}`)
  ScrollToTop()

  return data
}
