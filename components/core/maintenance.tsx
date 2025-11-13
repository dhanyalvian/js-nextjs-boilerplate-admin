//- components/core/maintenance.tsx

"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { WrenchIcon, RefreshCcw } from "lucide-react"

export const MaintenancePage = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md text-center p-6 shadow-xs">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <WrenchIcon className="h-12 w-12 text-yellow-500 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold">We’ll be back soon!</CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Our site is currently down for maintenance. We’re working hard to get things back up.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <Alert>
            <AlertTitle>Estimated Downtime</AlertTitle>
            <AlertDescription>
              The system should be back online within a few hours. Thank you for your patience.
            </AlertDescription>
          </Alert>

          <Button onClick={handleReload} className="w-full mt-2">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
