//- app/login/page.tsx

"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { AppFooter } from "@/components/core/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import LoginForm from "./form"

const LoginPage = () => {
  return (
    <div className="bg-main flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center">
          <div>
            <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="text-lg font-semibold">
            Boilerplate Admin
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="shadow-xs">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your username and password below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
      <AppFooter />
    </div>
  )
}

export default LoginPage
