'use client'

import { mapApiProductToProduct } from '@/lib/utils/product-mapper'
import { Product } from '@/types/product'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { hikvisionAPI } from '../data/api'

interface UseProductsOptions extends ProductsParams {
	limit?: number
}

interface UseProductsReturn {
	products: Product[]
	categories: string[]
	loading: boolean
	error: string | null
	totalCount: number
	hasNext: boolean
	hasPrevious: boolean
	loadMore: () => void
	refresh: () => void
	search: string | undefined
	getBestSellers?: any
}

export function useProducts(
	options: UseProductsOptions = {}
): UseProductsReturn {
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [totalCount, setTotalCount] = useState(0)
	const [hasNext, setHasNext] = useState(false)
	const [hasPrevious, setHasPrevious] = useState(false)
	const [offset, setOffset] = useState(0)

	const memoizedOptions = useMemo(
		() => ({
			search: options.search,
			limit: options.limit,
			category: options.category,
			in_stock: options.in_stock,
		}),
		[options.search, options.limit, options.category, options.in_stock]
	)

	const fetchProducts = useCallback(
		async (params: ProductsParams = {}) => {
			try {
				setLoading(true)
				setError(null)

				console.log('[v0] Fetching products with params:', {
					...memoizedOptions,
					...params,
				})

				const response = await hikvisionAPI.getProducts({
					limit: memoizedOptions.limit || 20,
					offset: params.offset || 0,
					...memoizedOptions,
					...params,
				})

				console.log('[v0] API response:', response)

				if (!response || typeof response !== 'object') {
					throw new Error('Invalid API response format')
				}

				if (!Array.isArray(response.results)) {
					console.error(
						'[v0] Invalid results format:',
						response.results
					)
					throw new Error(
						'API response does not contain valid results array'
					)
				}

				console.log('[v0] Raw products from API:', response.results)
				const mappedProducts = response.results.map(
					mapApiProductToProduct
				)
				console.log('[v0] Mapped products:', mappedProducts)

				if (params.offset === 0) {
					setProducts(mappedProducts)
				} else {
					setProducts(prev => [...prev, ...mappedProducts])
				}

				setTotalCount(response.count || 0)
				setHasNext(!!response.next)
				setHasPrevious(!!response.previous)

				if (response.results.length > 0) {
					const uniqueCategories = Array.from(
						new Set(
							response.results
								.filter(
									product =>
										product.category &&
										product.category.name
								)
								.map(product => product.category!.name)
						)
					)
					console.log('[v0] Extracted categories:', uniqueCategories)
					setCategories(uniqueCategories)
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: 'An error occurred while fetching products'
				setError(errorMessage)
				console.error('[v0] Error fetching products:', err)

				setProducts([])
				setCategories([])
			} finally {
				setLoading(false)
			}
		},
		[memoizedOptions]
	)

	const loadMore = useCallback(() => {
		if (hasNext && !loading) {
			const newOffset = offset + (memoizedOptions.limit || 20)
			setOffset(newOffset)
			fetchProducts({ offset: newOffset })
		}
	}, [hasNext, loading, offset, memoizedOptions.limit, fetchProducts])

	const refresh = useCallback(() => {
		setOffset(0)
		fetchProducts({ offset: 0 })
	}, [fetchProducts])

	useEffect(() => {
		console.log('[v0] useEffect triggered with options:', memoizedOptions)
		fetchProducts()
	}, [memoizedOptions, fetchProducts])

	useEffect(() => {
		setOffset(0)
	}, [memoizedOptions])

	return {
		products,
		categories,
		loading,
		error,
		totalCount,
		hasNext,
		hasPrevious,
		loadMore,
		refresh,
	}
}
