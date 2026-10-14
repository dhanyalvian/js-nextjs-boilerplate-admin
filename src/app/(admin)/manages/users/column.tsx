//- src/app/(admin)/manages/users/column.tsx

import { RespManageUserList } from "./interface"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
} from "@/components/core/data-table/columns"
import { Column } from "@/components/core/data-table/interface"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Call02Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

export const Columns: Column<RespManageUserList>[] = [
  {
    key: "avatar",
    header: "Avatar",
    size: 80,
    // enableSorting: false,
    render: (row) => {
      return (
        <Avatar className="size-10">
          <AvatarImage
            src={row.avatar}
            alt={row.firstname}
            // className="grayscale"
          />
          <AvatarFallback>{row.firstname}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    key: "name",
    header: "Name",
    size: 0,
    render: (row) => {
      const fullname = row.lastname
        ? row.firstname + " " + row.lastname
        : row.firstname

      return <div>{fullname}</div>
    },
  },
  {
    key: "gender",
    header: "Gender",
    size: 120,
    render: (row) => {
      const genderText = row.gender === "M" ? "Male" : "Female"
      const genderVariant = row.gender === "M" ? "secondary" : "outline"

      return (
        <Badge variant={genderVariant} className="capitalize">
          {genderText}
        </Badge>
      )
    },
  },
  {
    key: "email",
    header: "Contacts",
    size: 320,
    // enableSorting: false,
    render: (row) => {
      return (
        <div className="flex flex-col gap-1">
          <CellIcon
            icon={Mail01Icon}
            text={row.email}
          />
          <CellIcon
            icon={Call02Icon}
            text={row.phone}
            className="text-muted-foreground"
          />
        </div>
      )
    },
  },
  {
    key: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    // enableSorting: false,
    render: (row) => {
      return (
        <CellActions
          pathEdit={`/manages/users/edit/${row.id}`}
          pathDelete={`/manages/users/delete/${row.id}`}
        />
      )
    },
  },
]
