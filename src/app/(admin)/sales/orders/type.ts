//- src/app/(admin)/manages/products/type.ts

export interface SalesOrderListResp {
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
