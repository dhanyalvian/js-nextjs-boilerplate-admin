//- src/components/core/nav-secondary.tsx

"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { navObj } from "@/types/nav"

export function NavSecondary({
  menus,
  ...props
}: {
  menus: navObj[],
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="gap-px">
          {menus.map((menu) => (
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === menu.url}
                className={`font-[450] rounded-sm ${menu.soon ? "text-muted-foreground/70" : ""}`}
              >
                <Link href={menu.url}>
                  {menu.icon && (
                    <HugeiconsIcon icon={menu.icon} className="nav-icon" />
                  )}
                  <span className="font-sidebar-menu">{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
