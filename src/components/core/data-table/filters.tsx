//- src/components/core/data-table/filters.tsx

import React from "react"
import { format } from "date-fns"
import { HugeiconsIcon } from "@hugeicons/react"
import { DataTableApplyPayload, DataTableFilterCheckboxProps, DataTableFilterDateRangeValue } from "./interface"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import { Calendar02Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { GetDateFormat } from "@/lib/date"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { GetListParams } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { IconSizeCss, IconStrokeWidth } from "@/lib/base"

const ClearLabel = "Clear"

type FilterCheckboxProps = DataTableFilterCheckboxProps & {
  selectedValues: string[],
  setSelectedValues: (values: string[]) => void,
}
export const FilterCheckbox = ({
  id: key,
  label,
  options,
  searchable = false,
  isLoading = false,
  icon,
  selectedValues,
  setSelectedValues,
}: FilterCheckboxProps) => {
  const [open, setOpen] = React.useState(false)
  const showClearFilter = selectedValues.length > 0

  const handleSelect = (value: string) => {
    const isSelected = selectedValues.includes(value)

    if (isSelected) {
      // 1. Ambil data terbaru setelah dihapus
      const updatedValues = selectedValues.filter((v) => v !== value)
      setSelectedValues(updatedValues)
    } else {
      // Jika menambah data baru
      const updatedValues = [...selectedValues, value]
      setSelectedValues(updatedValues)
    }
  }

  // Helper to display the currently selected items
  const displaySelected = () => {
    const result = label
    const labels = selectedValues
      .map((value) => options.find((s) => s.value === value)?.label)
      .filter((label): label is string => label !== undefined) // Filter out undefined/null

    return (
      <>
        {icon && (
          <HugeiconsIcon
            icon={icon}
            strokeWidth={IconStrokeWidth}
            className={`${IconSizeCss} ${selectedValues.length > 0 ? "text-sidebar-icon" : "text-muted-foreground"}`}
          />
        )}

        <div className={`text-xs-plus pr-0.5 ${selectedValues.length == 0 && "text-muted-foreground"}`}>
          {result}
        </div>

        {selectedValues.length > 0 && (
          <Badge className="text-[10px]">
            {labels.length}
          </Badge>
        )}
      </>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="rounded-2xl text-xl-plus">
        <Button
          type="button"
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between font-normal shadow-xs h-8 shrink-0"
          disabled={isLoading}
        >
          {displaySelected()}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="min-w-fit w-auto m-0 p-0 shadow-xs rounded-2xl overflow-hidden">
        <Command key={key} className="p-0 rounded-2xl">
          {searchable && (
            <CommandInput placeholder={`Search ${label}...`} className="" />
          )}

          <CommandList>
            {searchable && (
              <CommandEmpty className="px-4 py-2">
                <span className="text-xs text-muted-foreground font-normal">Data not found</span>
              </CommandEmpty>
            )}

            <CommandGroup>
              {options.map((row) => {
                const isChecked = selectedValues.includes(row.value)

                return (
                  <CommandItem
                    key={row.value}
                    onSelect={() => handleSelect(row.value)}
                    className="flex items-center space-x-1 py-1.5 px-2.5 cursor-pointer rounded-xl"
                  >
                    <div
                      // Using a simple div or Checkbox component wrapper for alignment
                      className={cn(
                        "flex items-center justify-center h-4 w-4 rounded border border-primary transition-colors",
                        isChecked
                          ? "bg-primary text-primary-foreground"
                          : "opacity-15"
                      )}
                    >
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        strokeWidth={IconStrokeWidth}
                        className={cn("h-4 w-4 text-white", isChecked ? "opacity-100" : "opacity-0")}
                      />
                    </div>
                    <span className="text-xs-plus capitalize">{row.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>

          {showClearFilter && (
            <>
              <Separator />

              <CommandGroup>
                <CommandItem className="cursor-pointer text-xs justify-center p-1 rounded-full">
                  <div
                    className="flex flex-row items-center justify-center gap-1.5 w-full h-full text-muted-foreground"
                    onClick={() => {
                      setSelectedValues([])
                      setOpen(false)
                    }}
                  >
                    {ClearLabel}
                  </div>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface FilterDateRangeProps {
  title: string,
  disabled?: boolean,
  value: DataTableFilterDateRangeValue,
  onChange: (value: DataTableFilterDateRangeValue) => void,
}
export const FilterDateRange = ({
  title,
  disabled = false,
  value,
  onChange,
}: FilterDateRangeProps) => {
  const selected = value.from ? { from: value.from, to: value.to } : undefined

  return (
    <Popover>
      <PopoverTrigger asChild className="rounded-full shadow-xs">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "justify-start px-2.5 font-normal text-xs-plus h-8",
            !value.from && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <HugeiconsIcon
            icon={Calendar02Icon}
            strokeWidth={IconStrokeWidth}
            className={cn(
              IconSizeCss,
              !value.from ? "" : "text-sidebar-icon",
            )}
          />
          {value.from ? (
            value.to ? (
              <>
                {GetDateFormat(value.from)} - {GetDateFormat(value.to)}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span className="text-xs-plus">{title}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0 rounded-xl shadow-xs">
        <Calendar
          mode="range"
          defaultMonth={value.from}
          selected={selected}
          onSelect={(range) => onChange({ from: range?.from, to: range?.to })}
          numberOfMonths={2}
          min={1}
          max={30}
          disabled={{
            after: new Date(),
          }}
          classNames={{
            day: "[&:last-child[data-selected=true]_button]:rounded-r-full [&:first-child[data-selected=true]_button]:rounded-l-full",
            today: "bg-accent text-accent-foreground rounded-full data-[selected=true]:rounded-full",
            range_start: "rounded-l-full bg-accent",
            range_end: "rounded-r-full bg-accent",
            button_previous: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-full",
            ),
            button_next: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-full",
            ),
          }}
          components={{
            DayButton: ({ className, ...props }) => (
              <CalendarDayButton
                className={cn(
                  "data-[selected-single=true]:rounded-full data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full hover:rounded-full data-[range-middle=true]:hover:rounded-none",
                  className,
                )}
                {...props}
              />
            ),
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

interface FilterResetProps {
  disabled?: boolean,
  onClick?: () => void,
}
export const FilterReset = ({ disabled = false, onClick }: FilterResetProps) => {
  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      className="justify-start px-2.5 border-dashed font-normal text-muted-foreground text-xs"
      disabled={disabled}
      onClick={onClick}
    >
      Clear
    </Button>
  )
}

interface UseListSearchFilterApplyProps<TFilters> {
  queryKeyBase: (string | number)[],
  search: string,
  limit: number,
  setSearch: (value: string) => void,
  setPage: (value: number) => void,
  setDebouncedSearch: (value: string) => void,
  setAppliedFilter: (filters: TFilters) => void,
  buildFilters: (
    filters: Record<string, string[]>,
    dateRanges: Record<string, DataTableFilterDateRangeValue>,
  ) => TFilters,
  fetchList: (params: GetListParams<TFilters>) => Promise<ApiResp<unknown>>,
  errorMessage?: string,
}
export const useListSearchFilterApply = <TFilters,>({
  queryKeyBase,
  search,
  limit,
  setSearch,
  setPage,
  setDebouncedSearch,
  setAppliedFilter: setAppliedFilter,
  buildFilters,
  fetchList,
  errorMessage = "Gagal memuat data.",
}: UseListSearchFilterApplyProps<TFilters>) => {
  const queryClient = useQueryClient()

  return async ({ filters, dateRanges, isReset }: DataTableApplyPayload) => {
    const nextSearch = isReset ? "" : search
    const nextFilters = buildFilters(filters, dateRanges)

    const nextKey = [
      ...queryKeyBase,
      1,
      limit,
      nextSearch,
      JSON.stringify(nextFilters),
    ]

    if (isReset) setSearch("")
    setPage(1)
    setDebouncedSearch(nextSearch)
    setAppliedFilter(nextFilters)

    try {
      await queryClient.fetchQuery({
        queryKey: nextKey,
        queryFn: () => fetchList({
          page: 1,
          limit,
          search: nextSearch,
          filters: nextFilters,
        }),
      })
      toast.success(isReset ? "Filter berhasil dihapus." : "Filter berhasil diterapkan.")
    } catch {
      toast.error(errorMessage)
    }
  }
}
