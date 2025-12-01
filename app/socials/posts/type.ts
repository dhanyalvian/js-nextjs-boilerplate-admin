//- app/socials/posts/type.ts

import { BaseList } from "@/types/base";

export interface SocialPostListResp extends BaseList {
  posts: SocialPostList[],
}

export interface SocialPostList {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: {
    likes: number,
    dislikes: number,
  },
  views: number,
  userId: number,
}
