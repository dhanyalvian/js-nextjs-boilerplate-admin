//- src/lib/api.ts

import { useState } from "react"
import { useSearchParams } from "next/navigation"

export interface GetListParams<T> {
  page?: number,
  limit?: number,
  search?: string,
  filters?: T,
}

export const useCurl = () => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [page, setPage] = useState(Number(searchParams.get("p")) || 1)
  const limit = 15

  return {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    page,
    setPage,
    limit,
  }
}

export const GetQueryParams = <T>({
  page,
  limit,
  search,
  filters,
}: GetListParams<T>) => {
  const params = new URLSearchParams()

  params.set("page", String(page))
  params.set("limit", String(limit))

  if (search?.trim()) params.set("search", search.trim())
  if (filters && Object.keys(filters).length > 0) {
    params.set("filters", JSON.stringify(filters));
  }
  
  return params.toString()
}

export const ApiInternal = async (path: string, options?: RequestInit) => {
  const ep = process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || "/api/v1"
  const url = `${ep}${path}`
  const res = await fetch(url, { ...options })

  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh-token", { method: "POST" })

    if (!refreshRes.ok) {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/login"
      throw new Error("Unauthorized")
    }

    const retryRes = await fetch(url, { ...options })
    const data = await retryRes.json()
    return data
  }

  const data = await res.json()
  return data
}
