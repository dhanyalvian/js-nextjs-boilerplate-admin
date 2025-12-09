//- app/(admin)/manages/products/type.ts

import { BaseList } from "@/types/base";

export interface ManageProductListResp extends BaseList {
  products: ManageProductList[],
}

export interface ManageProductList {
  id: number,
  title: string,
  thumbnail: string,
  sku: string,
  brand: string,
  category: string,
  price: number,
  stock: number,
  rating: number,
  tags: string[],
}
