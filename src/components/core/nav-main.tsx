//- src/components/core/nav-main.tsx

"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronRightIcon } from "@hugeicons/core-free-icons"
import { navObj } from "@/types/nav"

interface NavMainProps {
  menus: navObj[],
}
export const NavMain = ({ menus }: NavMainProps) => {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-0.5">
        {menus.map((menu) => {
          return (
            (menu.submenus && menu.submenus.length > 0) ? (
              <Collapsible
                key={menu.title}
                asChild
                className="group/collapsible"
                defaultOpen={menu.submenus?.some((submenu) => submenu.url === pathname) || !menu.soon}
              >
                <SidebarMenuItem className="gap-0.5">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={menu.title}
                      className={`rounded-sm ${menu.soon ? "text-muted-foreground/70" : ""}`}
                    >
                      {menu.icon && <HugeiconsIcon icon={menu.icon} className="nav-icon text-sidebar-icon" />}
                      <span className="font-sidebar-menu">{menu.title}</span>
                      <HugeiconsIcon
                        icon={ChevronRightIcon}
                        strokeWidth={2}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="gap-0.5">
                      {menu.submenus?.map((submenu) => (
                        <SidebarMenuSubItem key={submenu.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === submenu.url}
                            className={`rounded-sm overflow-visible ${submenu.soon ? "text-muted-foreground/70" : ""}`}
                          >
                            <Link href={submenu.url}>
                              {submenu.icon &&
                                <HugeiconsIcon
                                  icon={submenu.icon}
                                  strokeWidth={1.5}
                                  className={`nav-icon ${submenu.soon ? "text-muted-foreground/70" : "text-sidebar-icon"}`}
                                />
                              }
                              <span className={`font-sidebar-menu ${submenu.soon ? "text-muted-foreground/70" : ""}`}>
                                {submenu.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={menu.title} data-active={true}>
                <SidebarMenuButton
                  asChild
                  tooltip={menu.title}
                  isActive={pathname === menu.url}
                  className={`rounded-sm ${menu.soon ? "text-muted-foreground/70" : ""}`}
                >
                  <Link href={menu.url}>
                    {menu.icon && <HugeiconsIcon icon={menu.icon} className="nav-icon text-sidebar-icon" />}
                    <span className="font-sidebar-menu">{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export const NavMainNew = ({ menus }: NavMainProps) => {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menus.map((menu) => (
          <div key={menu.id} className="mb-2">
            {menu.title && (
              <SidebarGroupLabel
                className="uppercase text-[11px] text-[#86868B] font-semibold"
              >
                {menu.title}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-0.5">
              {menu.submenus?.map((submenu) => (
                <SidebarMenuItem key={submenu.title} data-active={true} className="m-0">
                  <SidebarMenuButton
                    asChild
                    tooltip={submenu.title}
                    isActive={pathname === submenu.url}
                    className={`font-[450] rounded-sm overflow-visible`}
                  >
                    <Link href={submenu.url}>
                      {submenu.icon && (
                        <HugeiconsIcon
                          icon={submenu.icon}
                          strokeWidth={1.5}
                          className={`nav-icon ${submenu.soon ? "text-sidebar-disabled" : "text-sidebar-icon"}`}
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${submenu.soon ? "text-sidebar-disabled" : ""}`}
                      >
                        {submenu.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
