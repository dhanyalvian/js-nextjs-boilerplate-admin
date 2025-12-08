//- app/(admin)/calendars/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Calendar } from "@/components/ui/calendar"
import React from "react"

const breadcrumbItems = [
  {
    label: "Calendars",
  },
]

const CalendarsPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="w-[1200px] h-[600px]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            // className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
            className="rounded-lg border w-full h-full"
            buttonVariant="ghost"
          />
        </div>
      </AppMain>
    </>
  )
}

export default CalendarsPage
