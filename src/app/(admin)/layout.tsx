//- src/app/(admin)/layout.tsx

import type { Metadata } from "next"
import { Roboto_Flex, Roboto_Mono } from "next/font/google"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/core/app-sidebar"
import { AppFooter } from "@/components/core/app-layout"
import "./../globals.css"
import ReactQueryProvider from "./../provider"
import { AppConfig } from "@/lib/app"

const fontSans = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
})

const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: AppConfig.appName,
  description: AppConfig.appDesc,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`bg-sidebar ${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ReactQueryProvider>
          <SidebarProvider className="bg-sidebar">
            <AppSidebar className="bg-sidebar shadow-xs" />

            <SidebarInset className="bg-main">
              {children}

              <AppFooter />
            </SidebarInset>
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
