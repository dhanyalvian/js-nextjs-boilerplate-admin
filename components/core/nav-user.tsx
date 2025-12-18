//- components/core/nav-user.tsx

"use client"

import {
  Bell,
  CircleCheck,
  CircleUserRound,
  EllipsisVertical,
  LogOut,
} from "lucide-react"

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
import { ApiInternal } from "../api/client"
import { useQueries } from "@tanstack/react-query"

interface userLoggedResp {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  image: string,
}

const getUserLogged = async (): Promise<userLoggedResp> => {
  const data = await ApiInternal("/auth/me")
  return data
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
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
  const avatar = queryUserLogged.data ? queryUserLogged.data.image : ""
  const email = queryUserLogged.data ? queryUserLogged.data.email : ""
  const fullName = queryUserLogged.data ? `${queryUserLogged.data.firstName} ${queryUserLogged.data.lastName}` : ""

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={avatar} alt={fullName} />
                <AvatarFallback className="rounded-full">{getInitials(fullName)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
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
                  <AvatarImage src={avatar} alt={fullName} />
                  <AvatarFallback className="rounded-full">{getInitials(fullName)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRound />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
