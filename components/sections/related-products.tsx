"use client"

import { useTranslations } from "next-intl"
import { ProductCard } from "@/components/ui/product-card"
import { products, type ProductCategory } from "@/lib/data/products"

interface RelatedProductsProps {
  currentProductId: string
  category: ProductCategory
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const t = useTranslations("product")

  const relatedProducts = products
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("relatedProducts")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
