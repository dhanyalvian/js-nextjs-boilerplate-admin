//- src/app/(admin)/manages/products/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import {
  ReqManageProductFilter,
  RespManageProductFilter,
  RespManageProductList,
} from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetManageProductFilter = async (): Promise<ApiResp<RespManageProductFilter>> => {
  const data = await ApiInternal("/products/filters")
  return data
}

export const GetManageProductList = async ({
  page, limit, search, filters,
}: GetListParams<ReqManageProductFilter>): Promise<ApiResp<RespManageProductList>> => {
  const params = GetQueryParams<ReqManageProductFilter>({ page, limit, search, filters })
  const data = await ApiInternal(`/products?${params}`)
  ScrollToTop()

  return data
}
