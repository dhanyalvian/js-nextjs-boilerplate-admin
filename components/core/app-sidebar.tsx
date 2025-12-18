//- components/core/app-sidebar.tsx

"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { NavMain } from "@/components/core/nav-main"
import { NavUser } from "@/components/core/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { dataNav } from "@/data/nav"
import Link from "next/link"

const data = dataNav

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/" aria-label="Dashboard">
                <GalleryVerticalEnd className="size-5!" />
                <span className="text-base font-semibold mt-0.5">Boilerplate Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain menus={data.navMain} />
        <NavSecondary menus={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
