//- src/components/core/nav-user.tsx

"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getInitials } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ApiInternal } from "@/lib/api"
import { useQueries } from "@tanstack/react-query"
import { toast } from "sonner"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { EllipsisVerticalIcon, LogoutSquare01Icon } from "@hugeicons/core-free-icons"
import { navObj } from "@/types/nav"

interface userLoggedResp {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  avatar: string,
}

const getUserLogged = async (): Promise<userLoggedResp> => {
  const data = await ApiInternal("/auth/me")
  return data.record
}

interface NavUserProps {
  menus: navObj[],
}

export const NavUser = ({ menus }: NavUserProps) => {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    toast.success("Anda berhasil keluar")
    router.replace("/login")
  }

  const queries = useQueries({
    queries: [{
      queryKey: ["user", "logged"],
      queryFn: () => getUserLogged(),
      refetchOnWindowFocus: false,
    }],
  })
  const [queryUserLogged] = queries
  const avatar = queryUserLogged.data?.avatar ?? ""
  const email = queryUserLogged.data?.email ?? ""
  const firstname = queryUserLogged.data?.firstname ?? ""
  const lastname = queryUserLogged.data?.lastname ?? ""
  const fullname = lastname ? firstname + " " + lastname : firstname

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="font-[450] rounded-sm"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={avatar} alt={fullname} />
                <AvatarFallback className="rounded-full">{getInitials(fullname)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-sidebar-menu">{fullname}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <HugeiconsIcon icon={EllipsisVerticalIcon} className="ml-auto nav-icon" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={avatar} alt={fullname} />
                  <AvatarFallback className="rounded-full">{getInitials(fullname)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-sidebar-menu">{fullname}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menus.map((menu) => (
                <Link key={menu.url} href={menu.url}>
                  <DropdownMenuItem className="rounded-md">
                    {menu.icon && (
                      <HugeiconsIcon icon={menu.icon} className="nav-icon text-accent-foreground" />
                    )}
                    <span className="truncate font-sidebar-menu">{menu.title}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <HugeiconsIcon icon={LogoutSquare01Icon} className="nav-icon text-accent-foreground" />
              <span className="truncate font-sidebar-menu">Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
