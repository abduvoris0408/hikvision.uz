import { ProductDetail } from '@/components/sections/product-detail'
import { ProductDetailSkeleton } from '@/components/ui/product-detail-skeleton'
import { hikvisionAPI } from '@/lib/data/api'

import { mapApiProductToProduct } from '@/lib/utils/product-mapper'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface ProductPageProps {
	params: {
		id: string
	}
}

async function ProductDetailWrapper({ id }: { id: string }) {
	try {
		const productId = Number.parseInt(id)

		if (isNaN(productId)) {
			notFound()
		}

		const apiProduct = await hikvisionAPI.getProductById(productId)
		const product = mapApiProductToProduct(apiProduct)

		if (apiProduct.image) {
			product.images = [apiProduct.image]
			product.description = product.fullDescription
		}

		return <ProductDetail product={product} />
	} catch (error) {
		console.error('Error loading product:', error)
		notFound()
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	return (
		<div className='min-h-screen bg-background'>
			<div className='container mx-auto px-4 py-8'>
				<Suspense fallback={<ProductDetailSkeleton />}>
					<ProductDetailWrapper id={params.id} />
				</Suspense>
			</div>
		</div>
	)
}
