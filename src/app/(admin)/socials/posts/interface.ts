//- src/app/(admin)/socials/posts/interface.ts

export interface RespSocialPostList {
  id: number,
  title: string,
  body: string,
  tags: string[],
  likes: number,
  dislikes: number,
  views: number,
}
