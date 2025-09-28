'use client'

import { mapApiProductToProduct } from '@/lib/utils/product-mapper'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import { hikvisionAPI } from '../data/api'

interface UseProductDetailResult {
	product: Product | null
	loading: boolean
	error: string | null
	refetch: () => void
}

export function useProductDetail(id: number): UseProductDetailResult {
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchProduct = async () => {
		try {
			setLoading(true)
			setError(null)

			console.log('[v0] Fetching product with ID:', id)

			const apiProduct = await hikvisionAPI.getProductById(id)
			const mappedProduct = mapApiProductToProduct(apiProduct)

			if (apiProduct.image) {
				// If API provides multiple images in the future, we can parse them here
				// For now, we'll use the single image as the main image
				mappedProduct.images = [apiProduct.image]
				mappedProduct.description = mappedProduct.fullDescription
			}

			setProduct(mappedProduct)
			console.log('[v0] Product fetched successfully:', mappedProduct)
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to fetch product'
			console.error('[v0] Error fetching product:', err)
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (id) {
			fetchProduct()
		}
	}, [id])

	return {
		product,
		loading,
		error,
		refetch: fetchProduct,
	}
}
