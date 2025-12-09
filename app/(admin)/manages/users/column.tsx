//- app/(admin)/manages/users/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { ManageUserList } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellImage,
  imageColumnSize,
} from "@/components/core/data-table/columns"
import { Mail, Mars, Phone, Venus } from "lucide-react"
import { DateFormated } from "@/lib/date"
import { Badge } from "@/components/ui/badge"

export const Columns: ColumnDef<ManageUserList>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => <CellImage src={row.original.image} alt={row.original.firstName} />,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      let fullName = row.original.firstName;
      if (row.original.lastName) {
        fullName += ' ' + row.original.lastName;
      }

      return (
        <div className="flex flex-col gap-1">
          <div>{fullName}</div>
          <div className="text-muted-foreground">@{row.original.username}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    size: 120,
    cell: ({ row }) => {
      const gender = row.original.gender
      const iconGender = gender === "male" ? Mars : Venus
      return <CellIcon icon={iconGender} text={gender} className="capitalize" />
    },
  },
  {
    accessorKey: "birthDate",
    header: "Date of Birth",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{DateFormated(row.original.birthDate)}</div>
          <div className="text-muted-foreground">{row.original.age} years</div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Contacts",
    size: 320,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <CellIcon icon={Mail} text={row.original.email} />
          <CellIcon icon={Phone} text={row.original.phone} className="text-muted-foreground" />
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 100,
    cell: ({ row }) => {
      const role = row.original.role
      let classRole = ""
      if (role === "admin") {
        classRole = "badge-1"
      } else if (role === "moderator") {
        classRole = "badge-2"
      } else if (role === "user") {
        classRole = "badge-4"
      }

      return (
        <Badge variant="outline" className={`capitalize ${classRole}`}>{row.original.role}</Badge>
      )
    },
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellActions
          pathEdit={`/manages/recipes/edit/${row.original.id}`}
          pathDelete={`/manages/recipes/delete/${row.original.id}`}
        />
      )
    },
  },
]
