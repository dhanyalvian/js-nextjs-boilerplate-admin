//- app/(admin)/manages/recipes/filters.tsx

import { FilterCheckbox, FilterReset } from "@/components/core/data-table/filters"
import { GaugeIcon, UtensilsIcon } from "lucide-react"
import React from "react"

interface FiltersProps {
  isLoading: boolean,
}
export const Filters = ({ isLoading }: FiltersProps): React.ReactNode => {
  return (
    <>
      {FilterCheckbox({
        Icon: GaugeIcon,
        title: "Difficulty",
        data: [
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ],
        isLoading: isLoading,
      })}
      {FilterCheckbox({
        Icon: UtensilsIcon,
        title: "Meal Type",
        data: [
          { value: "appetizer", label: "Appetizer" },
          { value: "beverage", label: "Beverage" },
          { value: "breakfast", label: "Breakfast" },
          { value: "dessert", label: "Dessert" },
          { value: "dinner", label: "Dinner" },
          { value: "lunch", label: "Lunch" },
          { value: "side-dish", label: "Side Dish" },
          { value: "snack", label: "Snack" },
        ],
        searchable: true,
        isLoading: isLoading,
      })}
      {FilterReset({ disabled: isLoading })}
    </>
  )
}
