//- src/components/core/data-table/search.tsx

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { LoaderCircleIcon, SearchIcon, XIcon } from "@hugeicons/core-free-icons"
import { DataTableSearchProps } from "./interface"
import { IconSizeCss } from "@/lib/base"

export const DataTableSearch = ({
  searchValue,
  setSearch,
  setPage,
  placeholder = "Search...",
  isLoading = false,
}: DataTableSearchProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }
  const handleSearchClear = () => {
    setSearch("")
    setPage(1)
  }

  return (
    <InputGroup className="bg-card w-full max-w-70 h-8 gap-0 rounded-full shadow-xs">
      <InputGroupAddon className="pl-2 gap-1">
        <HugeiconsIcon
          icon={SearchIcon}
          strokeWidth={2}
          className={`${IconSizeCss} ${searchValue ? "text-sidebar-icon" : "text-muted-foreground"}`}
        />
      </InputGroupAddon>
      
      <InputGroupInput
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchValue}
        onChange={handleSearchChange}
        disabled={isLoading}
        className="h-full"
      />

      {searchValue ? (
        <InputGroupAddon align="inline-end" className="p-0 pr-2">
          <InputGroupButton
            type="button"
            variant="link"
            size="icon-sm"
            onClick={handleSearchClear}
            className="rounded-full"
          >
            <HugeiconsIcon
              icon={isLoading ? LoaderCircleIcon : XIcon}
              strokeWidth={2}
              className={`${IconSizeCss} ${isLoading && "animate-spin"}`}
            />
          </InputGroupButton>
        </InputGroupAddon>
      ) : isLoading ? (
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon
            icon={LoaderCircleIcon}
            strokeWidth={2}
            className="size-5 animate-spin"
          />
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}
