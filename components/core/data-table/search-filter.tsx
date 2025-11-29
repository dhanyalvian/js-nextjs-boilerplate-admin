//- components/core/data-table/search-filter.tsx

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Download, SearchIcon, X } from "lucide-react";

interface SearchProps {
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
  isLoading?: boolean,
  filters?: React.ReactNode,
}

export const Search = ({
  placeholder = "Pencarian...",
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
        {value && (
          <InputGroupAddon align="inline-end" onClick={onClear}>
            <X className="cursor-pointer hover:text-gray-950" />
          </InputGroupAddon>
        )}
      </InputGroup>
      
      {filters && filters}
    </div>
  )
}

export const Exports = () => {
  return (
    <Button variant="default" size="sm" className="rounded-full">
      <Download /> Export
    </Button>
  )
}
