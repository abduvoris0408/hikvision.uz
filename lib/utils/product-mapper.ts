// lib/utils/product-mapper.ts
import { Product } from '@/types/product'

interface ApiProduct {
	id: number
	name: string
	price: string
	in_stock: boolean
	short_description: string
	full_description: string
	image: string | null
	created_at: string
	category?: {
		id: number
		name: string
		parent: null
		subcategories: any[]
	} | null
	tags: any[]
	reviews: Array<{
		id: number
		product: {
			id: number
			name: string
		}
		name: string
		message: string
		rating: number
		created_at: string
	}>
}

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
	try {
		if (!apiProduct || typeof apiProduct !== 'object') {
			throw new Error('Invalid product data')
		}

		// Parse price from string to number with safety check
		const priceString = apiProduct.price?.toString() || '0'
		const price =
			Number.parseFloat(priceString.replace(/[^\d.-]/g, '')) || 0

		// Real reviews dan rating va count hisoblash
		const reviews = apiProduct.reviews || []
		const calculateAverageRating = (reviews: any[]) => {
			if (!reviews || reviews.length === 0) return 0
			const totalRating = reviews.reduce(
				(sum, review) => sum + (review.rating || 0),
				0
			)
			return Math.round((totalRating / reviews.length) * 10) / 10
		}

		const rating = calculateAverageRating(reviews)
		const reviewCount = reviews.length

		// Check if product is new (created within last 30 days)
		const createdDate = apiProduct.created_at
			? new Date(apiProduct.created_at)
			: new Date()
		const thirtyDaysAgo = new Date()
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
		const isNew = createdDate > thirtyDaysAgo

		// Best seller logic based on review count and rating
		const isBestSeller = reviewCount > 3 && rating > 4.0

		return {
			id: apiProduct.id.toString(),
			name: apiProduct.name || 'Unknown Product',
			price: price,
			originalPrice: isBestSeller ? price * 1.2 : undefined,
			image: apiProduct.image || '/diverse-products-still-life.png',
			category: apiProduct.category?.name || 'Uncategorized',

			// Real API ma'lumotlari
			reviews: reviews,
			rating: rating,
			reviewCount: reviewCount,

			isNew: isNew,
			isBestSeller: isBestSeller,
			inStock: apiProduct.in_stock ?? true,
			in_stock: apiProduct.in_stock ?? true, // API format ham qo'shamiz
			shortDescription: apiProduct.short_description || '',
			description: apiProduct.short_description || '',
			fullDescription: apiProduct.full_description || '',
			createdAt: apiProduct.created_at || new Date().toISOString(),
			tags: Array.isArray(apiProduct.tags)
				? apiProduct.tags.map(tag => tag?.name || '').filter(Boolean)
				: [],
		}
	} catch (error) {
		console.error('[v0] Error mapping product:', error, apiProduct)

		return {
			id: apiProduct?.id?.toString() || '0',
			name: 'Error Loading Product',
			price: 0,
			image: '/system-error-screen.png',
			category: 'Error',
			reviews: [],
			rating: 0,
			reviewCount: 0,
			isNew: false,
			isBestSeller: false,
			inStock: false,
			in_stock: false,
			shortDescription: 'Error loading product data',
			description: 'Error loading product data',
			fullDescription: 'Error loading product data',
			createdAt: new Date().toISOString(),
			tags: [],
		}
	}
}
