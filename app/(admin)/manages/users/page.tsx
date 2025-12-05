//- app/(admin)/manages/users/page.tsx

import { AppHeader } from "@/components/core/app-layout"
import { MaintenancePage } from "@/components/core/maintenance"

const breadcrumbItems = [
  {
    label: "Manages",
  },
  {
    label: "Users",
  },
]

export default function ManagesUsersPage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <MaintenancePage />
    </>
  )
}
