//- src/app/(admin)/manages/users/interface.ts

export interface ReqManageUserFilter {
  gender?: string[],
}

export interface RespManageUserList {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  avatar: string,
  gender: string,
}
