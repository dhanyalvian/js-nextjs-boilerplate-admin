//- src/app/(admin)/sales/orders/query.tsx

import { ApiInternal, GetListParams, GetQueryParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import {
  ReqSalesOrderFilter,
  RespSalesOrderFilter,
  RespSalesOrderList,
} from "./interface"
import { ScrollToTop } from "@/lib/scroll"

export const GetSalesOrderFilter = async (): Promise<ApiResp<RespSalesOrderFilter>> => {
  const data = await ApiInternal("/orders/filters")
  return data
}

export const GetSalesOrderList = async ({
  page, limit, search, filters,
}: GetListParams<ReqSalesOrderFilter>): Promise<ApiResp<RespSalesOrderList>> => {
  const params = GetQueryParams<ReqSalesOrderFilter>({ page, limit, search, filters })
  const data = await ApiInternal(`/orders?${params}`)
  ScrollToTop()

  return data
}
