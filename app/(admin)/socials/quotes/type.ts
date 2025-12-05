//- app/(admin)/socials/quotes/type.ts

import { BaseList } from "@/types/base";

export interface SocialQuoteListResp extends BaseList {
  quotes: SocialQuoteList[],
}

export interface SocialQuoteList {
  id: number,
  quote: string,
  author: string,
}
