//- lib/date.ts

import { format } from "date-fns"

export const locale = "en-US"

export const DateFormated = (date: string | Date): string => {
  return format(date, "LLL dd, y")
}
