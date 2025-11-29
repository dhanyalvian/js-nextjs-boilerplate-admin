//- libs/numbers.ts

export const locale = "en-US";

export const NumberFormated = (number: number): string => {
  return new Intl.NumberFormat(locale).format(number)
}
