//- src/app/(admin)/manages/products/interface.ts

import { DropdownResp } from "@/types/response";

export interface ReqManageProductFilter {
  brand?: string[],
  category?: string[],
}

export interface RespManageProductFilter {
  brand: DropdownResp[],
  category: DropdownResp[],
}

export interface RespManageProductList {
  id: number,
  name: string,
  sku: string,
  brand: string,
  category: string,
  tags: string[],
  thumbnail: string,
  price: number,
  discount: number,
  stock: number,
}
