//- app/socials/comments/type.ts

import { BaseList } from "@/types/base";

export interface SocialCommentListResp extends BaseList {
  comments: SocialCommentList[],
}

export interface SocialCommentList {
  id: number,
  body: string,
  postId: number,
  likes: number,
  user: SocialCommentListUser,
}

export interface SocialCommentListUser {
  id: number,
  username: string,
  fullName: string,
}
