//- src/components/core/card/section.tsx

"use client"

import { CardStat } from "@/components/sections/dashboard/type"
import { Card, CardContent } from "@/components/ui/card"
import { CardStatItem } from "./stat"

interface CardSectionStandardProps {
  cardStats: CardStat[],
  isLoading?: boolean,
}

export const CardSectionStandard = ({
  cardStats,
  isLoading = false,
}: CardSectionStandardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {isLoading ? Array.from({ length: cardStats.length }).map((_, i) => (
        <Card key={i} className="shadow-xs rounded-lg">
          <CardContent>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2" />
                <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="p-2.5 rounded-xl bg-muted animate-pulse" />
            </div>
          </CardContent>
        </Card>
      )) : cardStats.map((item) => (
        <>
          <CardStatItem
            key={item.label}
            label={item.label}
            value={item.value}
            valueCurr={item.currency}
            valueOpt={item.valueOpt}
            textColor={item.color}
            icon={item.icon}
          />
        </>
      ))}
    </div>
  )
}
