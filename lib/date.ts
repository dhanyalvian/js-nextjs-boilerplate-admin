//- lib/date.ts

export const locale = "en-US"

export const DateFormated = (date: string): string => {
  const formatted = new Date(date).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return formatted
}