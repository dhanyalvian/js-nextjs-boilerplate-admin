//- app/(admin)/page.tsx

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ChartAreaInteractive } from "@/components/sections/dashboard/chart-area-interactive"
import { SectionCards } from "@/components/sections/dashboard/section-cards"

const breadcrumbItems = [
  {
    label: "Dashboard",
  },
]

const DashboardPage = () => {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <SectionCards />

          {/* <div className="pt-0"> */}
            <ChartAreaInteractive />
            <ChartAreaInteractive />
          {/* </div> */}
        </div>
      </AppMain>
    </>
  )
}

export default DashboardPage
