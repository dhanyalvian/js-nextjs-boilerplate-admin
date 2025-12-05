//- app/login/page.tsx

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/core/login-form"

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  )
}
