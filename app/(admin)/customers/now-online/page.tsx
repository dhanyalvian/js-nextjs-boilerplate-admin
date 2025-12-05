//- app/(admin)/customers/now-online/page.tsx

import { AppHeader } from "@/components/core/app-layout"
import { MaintenancePage } from "@/components/core/maintenance"

const breadcrumbItems = [
  {
    label: "Customers",
  },
  {
    label: "Now Online",
  },
]

export default function NowOnlinePage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <MaintenancePage />
    </>
  )
}
