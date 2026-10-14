//- src/app/(admin)/sales/orders/interface.ts

import { DropdownResp } from "@/types/response";

export interface ReqSalesOrderFilter {
  status?: string[],
  paymentMethod?: string[],
}

export interface RespSalesOrderFilter {
  status: DropdownResp[],
  paymentMethod: DropdownResp[],
}

export interface RespSalesOrderList {
  id: number,
  orderNo: string,
  orderDate: string,
  customerId: string,
  customerName: string,
  customerEmail: string,
  customerAvatar: string,
  status: string,
  paymentMethod: string,
  totalPrice: number,
  totalDiscount: number,
  finalPrice: number,
}
