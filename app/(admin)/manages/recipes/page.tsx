//- app/(admin)/manages/recipes/page.tsx

import { AppHeader } from "@/components/core/app-layout"
import { MaintenancePage } from "@/components/core/maintenance"

const breadcrumbItems = [
  {
    label: "Manages",
  },
  {
    label: "Recipes",
  },
]

export default function ManagesRecipesPage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <MaintenancePage />
    </>
  )
}
