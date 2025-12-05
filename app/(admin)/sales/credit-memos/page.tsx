//- app/(admin)/sales/credit-memos/page.tsx

import { AppHeader } from "@/components/core/app-layout"
import { MaintenancePage } from "@/components/core/maintenance"

const breadcrumbItems = [
  {
    label: "Sales",
  },
  {
    label: "Credit Memos",
  },
]

export default function CreditMemosPage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <MaintenancePage />
    </>
  )
}
