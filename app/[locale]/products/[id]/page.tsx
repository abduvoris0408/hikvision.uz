import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/sections/product-detail"
import { ProductDetailSkeleton } from "@/components/ui/product-detail-skeleton"
import { RelatedProducts } from "@/components/sections/related-products"
import { products } from "@/lib/data/products"

interface ProductPageProps {
  params: Promise<{
    id: string
    locale: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail product={product} />
        </Suspense>

        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
