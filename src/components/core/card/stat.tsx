//- src/components/core/card/stat.tsx

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/lib/animate"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

interface CardStatItemProps {
  key: string,
  label: string,
  value: number,
  valueCurr?: boolean,
  valueOpt?: string,
  badge?: string,
  bgColor?: string,
  textColor?: string,
  icon?: IconSvgElement,
  info?: string,
}
export const CardStatItem = ({
  key,
  label,
  value,
  valueCurr = true,
  valueOpt = "",
  badge = "",
  textColor = "",
  icon,
  info = "",
}: CardStatItemProps) => {
  return (
    <Card key={key} className="border-0 ring-1 ring-border p-0 card-animation rounded-lg">
      <CardContent className="p-0">
        <div
          className={cn(
            "flex items-start justify-between gap-3 px-3 py-2",
            "bg-header rounded-lg rounded-b-none",
          )}
        >
          <div className="flex gap-2">
            <div className="text-sm text-label font-medium">
              {label}
            </div>

            {badge && (
              <Badge variant="outline" className="bg-card font-semibold text-muted-foreground/80">
                {badge}
              </Badge>
            )}
          </div>

          {icon && (
            <div className={`rounded-lg`}>
              <HugeiconsIcon
                icon={icon}
                strokeWidth={1.5}
                className={`size-5! ${textColor ? textColor : "text-sidebar-icon"}`}
              />
            </div>
          )}
        </div>

        <div className="flex bg-card border-t border-border gap-2 p-4 rounded-lg rounded-t-none">
          <div>
            <p className="text-2xl font-bold mt-1">
              <span className={textColor}>
                <AnimatedCounter value={value} currency={valueCurr} />
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}{valueOpt}
                </span>
              </span>
            </p>
          </div>

          {info && (
            <div className="text-muted-foreground/80">{info}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
