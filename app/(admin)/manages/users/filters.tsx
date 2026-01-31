//- app/(admin)/manages/users/filters.tsx

import { FilterCheckbox, FilterDateRange, FilterReset } from "@/components/core/data-table/filters"
import { VenusAndMarsIcon, UserLockIcon } from "lucide-react"
import React from "react"

interface FiltersProps {
  isLoading: boolean,
}
export const Filters = ({ isLoading }: FiltersProps): React.ReactNode => {
  return (
    <>
      {FilterCheckbox({
        Icon: VenusAndMarsIcon,
        title: "Gender",
        data: [
          { value: "M", label: "Male" },
          { value: "F", label: "Female" },
        ],
        isLoading: isLoading,
      })}
      {FilterDateRange({
        title: "Date of birth",
        disabled: isLoading,
      })}
      {FilterCheckbox({
        Icon: UserLockIcon,
        title: "Role",
        data: [
          { value: "admin", label: "Admin" },
          { value: "moderator", label: "Moderator" },
          { value: "user", label: "User" },
        ],
        isLoading: isLoading,
      })}
      {FilterReset({ disabled: isLoading })}
    </>
  )
}
