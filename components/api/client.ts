//- components/api/client.ts

import axios from "axios"

export const ApiLimit = Number(process.env.CONFIG_API_LIMIT ?? 10)
export const ApiDelay = Number(process.env.CONFIG_API_DELAY ?? 1000)

export const ApiClient = axios.create({
  baseURL: process.env.CONFIG_API_URL ?? "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 123456",
  },
})

export const getParamSkip = (page: number, limit: number): number => {
  return (page - 1) * limit
}

export const ApiInternal = async (path: string, options?: RequestInit) => {
  const ep = process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || ""
  const url = `${ep}${path}`
  console.log(url)
  const res = await fetch(url, { ...options })
  const data = await res.json()
  return data
}
