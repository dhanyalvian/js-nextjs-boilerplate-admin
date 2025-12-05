//- components/core/data-table/search-filter.tsx

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Download, FilePlusCorner, SearchIcon, X } from "lucide-react";

interface SearchProps {
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
  isLoading?: boolean,
  filters?: React.ReactNode,
}

export const Search = ({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  isLoading,
  filters,
}: SearchProps) => {
  return (
    <div className="flex gap-2">
      <InputGroup className="w-80 bg-white rounded-full shadow-xs">
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {value ? (
          <InputGroupAddon align="inline-end" onClick={onClear}>
            {isLoading ? (
              <Spinner />
            ) : (
              <X className="cursor-pointer hover:text-gray-950" />
            )}
          </InputGroupAddon>
        ) : isLoading ? (
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        ) : null}
      </InputGroup>

      {filters && filters}
    </div>
  )
}

interface ExportProps {
  title?: string,
}

export const Exports = ({ title }: ExportProps) => {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full shadow-xs">
            <FilePlusCorner /> New
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Add New {title && title}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full shadow-xs">
            <Download /> Export
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Export to CSV
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  )
}
