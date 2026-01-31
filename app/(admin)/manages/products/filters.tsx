//- app/(admin)/manages/products/filters.tsx

import { FilterCheckbox, FilterReset } from "@/components/core/data-table/filters"
import { LayoutListIcon, TagsIcon } from "lucide-react"
import React from "react"

interface FiltersProps {
  isLoading: boolean,
}
export const Filters = ({ isLoading }: FiltersProps): React.ReactNode => {
  return (
    <>
      {FilterCheckbox({
        Icon: LayoutListIcon,
        title: "Category",
        data: [
          { value: "beauty", label: "Beauty" },
          { value: "fragrances", label: "Fragrances" },
          { value: "furniture", label: "Furniture" },
          { value: "groceries", label: "Groceries" },
          { value: "home-decoration", label: "Home Decoration" },
          { value: "kitchen-accessories", label: "Kitchen Accessories" },
          { value: "laptops", label: "Laptops" },
          { value: "mens-shirts", label: "Mens Shirts" },
          { value: "mobile-accessories", label: "Mobile Accessories" },
          { value: "motorcycle", label: "Motorcycle" },
          { value: "skin-care", label: "Skin Care" },
          { value: "smartphones", label: "Smartphones" },
          { value: "sports-accessories", label: "Sports Accessories" },
          { value: "tablets", label: "Tablets" },
          { value: "sunglasses", label: "Sunglasses" },
          { value: "tops", label: "Tops" },
          { value: "vehicle", label: "Vehicle" },
          { value: "womens-bags", label: "Womens Bags" },
          { value: "womens-dresses", label: "Womens Dresses" },
          { value: "womens-shoes", label: "Womens Shoes" },
        ],
        searchable: true,
        isLoading: isLoading,
      })}
      {FilterCheckbox({
        Icon: TagsIcon,
        title: "Brand",
        data: [
          { value: "Essence", label: "Essence" },
          { value: "Glamour Beauty", label: "Glamour Beauty" },
          { value: "Velvet Touch", label: "Velvet Touch" },
          { value: "Chic Cosmetics", label: "Chic Cosmetics" },
          { value: "Nail Couture", label: "Nail Couture" },
          { value: "Calvin Klein", label: "Calvin Klein" },
          { value: "Chanel", label: "Chanel" },
          { value: "Dior", label: "Dior" },
          { value: "Dolce & Gabbana", label: "Dolce & Gabbana" },
          { value: "Gucci", label: "Gucci" },
          { value: "Annibale Colombo", label: "Annibale Colombo" },
          { value: "Furniture Co.", label: "Furniture Co." },
          { value: "Knoll", label: "Knoll" },
          { value: "Bath Trends", label: "Bath Trends" },
        ],
        searchable: true,
        isLoading: isLoading,
      })}
      {FilterReset({ disabled: isLoading })}
    </>
  )
}
