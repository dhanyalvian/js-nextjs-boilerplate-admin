//- src/app/layout.tsx

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "./provider"
import { Toaster } from "@/components/ui/sonner"
import { AppConfig } from "@/lib/app"

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`bg-amber ${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ReactQueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "group font-sans border-2",
                success: "!bg-slate-50 !text-slate-600 !border-slate-200",
                error: "!bg-slate-50 !text-red-500 !border-red-100",
                loading: "!bg-slate-50 !text-slate-700 !border-slate-200",
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
