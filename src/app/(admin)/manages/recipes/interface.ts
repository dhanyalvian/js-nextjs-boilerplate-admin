//- src/app/(admin)/manages/recipes/interface.tsx

import { DropdownResp } from "@/types/response";

export interface ReqManageRecipeFilter {
  cuisine?: string[],
  difficulty?: string[],
  mealType?: string[],
}

export interface RespManageRecipeFilter {
  cuisine: DropdownResp[],
  difficulty: DropdownResp[],
  mealType: DropdownResp[],
}

export interface RespManageRecipeList {
  id: number,
  name: string,
  image: string,
  cuisine: string,
  cuisineCode: string,
  difficulty: string,
  mealType: string[],
  tags: string[],
}
