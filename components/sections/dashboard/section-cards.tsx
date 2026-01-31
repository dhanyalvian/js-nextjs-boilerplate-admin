//- components/sections/dashboard/section-cards.tsx

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

export function SectionCards() {
  const Cards = [
    {
      title: "Total Revenue",
      description: "Total revenue generated from all sales",
      value: "$1,250.00",
      trend: "+12.5%",
      trendIcon: TrendingUp,
      footer: "Trending up this month",
      optional: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      description: "Total number of new customers registered",
      value: "1,234",
      trend: "-20%",
      trendIcon: TrendingDown,
      footer: "Down 20% this period",
      optional: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      description: "Total number of active user accounts",
      value: "45,678",
      trend: "+12.5%",
      trendIcon: TrendingUp,
      footer: "Strong user retention",
      optional: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      description: "Total number of orders placed",
      value: "4.5%",
      trend: "+4.5%",
      trendIcon: TrendingUp,
      footer: "Steady performance increase",
      optional: "Meets growth projections",
    },
  ]

  return (
    <div className="*:data-[slot=card]:bg-white *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Cards.map((card) => (
        <Card className="@container/card gap-10" key={card.title}>
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-muted/50">
                <card.trendIcon />
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-0.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}
              <card.trendIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              {card.optional}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
