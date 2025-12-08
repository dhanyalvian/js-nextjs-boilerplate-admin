//- app/(admin)/manages/recipes/type.ts

import { BaseList } from "@/types/base";

export interface ManageRecipeListResp extends BaseList {
  recipes: ManageRecipeList[],
}

export interface ManageRecipeList {
  id: number,
  name: string,
  image: string,
  cuisine: string,
  difficulty: string,
  mealType: string[],
  tags: string[],
  rating: number,
  reviewCount: number,
}
