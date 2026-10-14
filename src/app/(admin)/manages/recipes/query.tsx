//- src/app/(admin)/manages/recipes/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import {
  ReqManageRecipeFilter,
  RespManageRecipeFilter,
  RespManageRecipeList,
} from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetManageRecipeFilter = async (): Promise<ApiResp<RespManageRecipeFilter>> => {
  const data = await ApiInternal("/recipes/filters")
  return data
}

export const GetManageRecipeList = async ({
  page, limit, search, filters,
}: GetListParams<ReqManageRecipeFilter>): Promise<ApiResp<RespManageRecipeList>> => {
  const params = GetQueryParams<ReqManageRecipeFilter>({ page, limit, search, filters })
  const data = await ApiInternal(`/recipes?${params}`)
  ScrollToTop()
  
  return data
}
