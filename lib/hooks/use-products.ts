"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { products, type Product, type ProductCategory } from "@/lib/data/products"

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAllProducts(products)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getBestSellers = useCallback(() => allProducts.filter((p) => p.isBestSeller), [allProducts])
  const getNewProducts = useCallback(() => allProducts.filter((p) => p.isNew), [allProducts])
  const getByCategory = useCallback(
    (category: string) => allProducts.filter((p) => p.category === category),
    [allProducts],
  )

  const categories = useMemo(() => {
    const categoryMap = new Map<ProductCategory, number>()
    allProducts.forEach((product) => {
      const count = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, count + 1)
    })

    return Array.from(categoryMap.entries()).map(([id, count]) => ({
      id,
      name: getCategoryName(id),
      count,
    }))
  }, [allProducts])

  return {
    products: allProducts,
    loading,
    categories,
    getBestSellers,
    getNewProducts,
    getByCategory,
  }
}

function getCategoryName(category: ProductCategory): string {
  const names: Record<ProductCategory, string> = {
    cameras: "Kameralar",
    intercoms: "Interkomlar",
    turnstiles: "Turniketlar",
    dvr: "DVR",
    nvr: "NVR",
    accessories: "Aksessuarlar",
  }
  return names[category] || category
}
