//- app/layout.tsx

import type { Metadata } from "next";
import { Roboto_Flex, Roboto_Mono } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/core/app-sidebar";
import "./globals.css";
import { AppFooter } from "@/components/core/app-layout";

const fontSans = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boilerplate Admin",
  description: "A boilerplate for building admin dashboards with Next.js and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            {children}
            
            <AppFooter />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
