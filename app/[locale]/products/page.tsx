"use client"

import { Suspense } from "react"
import { useTranslations } from "next-intl"
import { ProductCatalog } from "@/components/sections/product-catalog"
import { ProductCatalogSkeleton } from "@/components/ui/product-catalog-skeleton"

export default function ProductsPage() {
  const t = useTranslations("products")

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h1>
            <p className="text-lg text-muted-foreground">{t("description")}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductCatalogSkeleton />}>
          <ProductCatalog />
        </Suspense>
      </div>
    </div>
  )
}
