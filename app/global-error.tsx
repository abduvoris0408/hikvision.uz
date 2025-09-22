"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-destructive">Something went wrong!</h1>
              <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/uz")}>
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
