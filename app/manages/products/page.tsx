//- app/manages/products/page.tsx

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ChartAreaInteractive } from "@/components/sections/dashboard/chart-area-interactive"

const breadcrumbItems = [
  {
    label: "Manages",
  },
  {
    label: "Products",
  },
]

export default function ManagesProductsPage() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <ChartAreaInteractive />
      </AppMain>
    </>
  )
}
