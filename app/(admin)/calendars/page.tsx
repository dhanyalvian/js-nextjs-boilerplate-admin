//- app/(admin)/calendars/page.tsx

import { AppHeader } from "@/components/core/app-layout"
import { MaintenancePage } from "@/components/core/maintenance"

const breadcrumbItems = [
  {
    label: "Calendars",
  },
]

export default function CalendarsPage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <MaintenancePage />
    </>
  )
}
