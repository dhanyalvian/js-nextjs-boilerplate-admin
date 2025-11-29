//- components/core/data-table/columns.tsx

import Link from "next/link"
import Image from "next/image"
import { EllipsisVertical, SquarePen, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const imageColumnSize = 130

export const ratingColumnHeader = 'Rating'
export const ratingColumnSize = 110

export const actionColKey = 'action'
export const actionColHeader = ""
export const actionColSize = 40
export const actionColEditSize = 90
export const actionColDelSize = actionColSize

export const iconSize = 16
export const imageWidth = 72
export const imageHeight = 72

interface CellImageProps {
  src: string
  alt: string
}
export const CellImage = ({ src, alt }: CellImageProps) => {
  return (
    <Image
      priority={true}
      src={src}
      alt={alt}
      className="table-image-td"
      width={imageWidth}
      height={imageHeight}
    />
  )
}

interface CellRatingProps {
  rating: number
}
export const CellRating = ({ rating }: CellRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <Star size={iconSize} className="text-yellow-400" fill="gold" />
      <span>{rating}</span>
    </div>
  )
}

interface ActionProps {
  path: string
}
export const ActionEdit = ({ path }: ActionProps) => {
  return (
    <Link title="Edit" href={path} className="group hover:text-sky-600">
      <div className="table-icon-td">
        <SquarePen size={iconSize} />
        <span className="group-hover:underline">Edit</span>
      </div>
    </Link>
  )
}

export const ActionDelete = ({ path }: ActionProps) => {
  return (
    <Link title="Delete" href={path}>
      <Button variant="outline" size="sm" className="rounded-full text-xs">
        <Trash2 /> Delete
      </Button>
    </Link>
  )
}

interface ActionsProps {
  pathEdit: string
  pathDelete: string
}
export const Actions = ({ pathEdit, pathDelete }: ActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={pathEdit} title="Edit">
              <SquarePen />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={pathDelete} title="Delete">
              <Trash2 />
              Delete
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    // <ButtonGroup>
    //   <Button variant="outline" size="icon-sm" asChild>
    //     <Link href={pathEdit} title="Edit">
    //       <SquarePen />
    //     </Link>
    //   </Button>

    //   <Button variant="outline" size="icon-sm" asChild>
    //     <Link href={pathDelete} title="Delete">
    //       <Trash2 />
    //     </Link>
    //   </Button>
    // </ButtonGroup>
  )
}
