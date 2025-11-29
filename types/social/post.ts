//- types/social/post.ts

import { BaseList } from "../base";

export interface PostResp extends BaseList {
  posts: PostList[],
}

export interface PostList {
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
