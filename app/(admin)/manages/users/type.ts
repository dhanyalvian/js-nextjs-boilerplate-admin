//- app/(admin)/manages/users/type.ts

import { BaseList } from "@/types/base";

export interface ManageUserListResp extends BaseList {
  users: ManageUserList[],
}

export interface ManageUserList {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  username: string,
  image: string,
  gender: string,
  birthDate: string,
  age: number,
  email: string,
  phone: string,
  role: string,
}
