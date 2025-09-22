"use client"

import { Card } from "@/components/ui/card"

export function ContactMap() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="h-96 bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium mb-2">Xarita</p>
              <p className="text-sm">Toshkent shahri, Chilanzar tumani, Arnasoy kochasi 7A</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
