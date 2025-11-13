//- types/breadcrumb.ts

export interface BreadcrumbItems {
  items: BreadcrumbItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
