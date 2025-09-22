import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCatalogSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search and Controls Skeleton */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar Skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid Skeleton */}
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4" />
                      ))}
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
