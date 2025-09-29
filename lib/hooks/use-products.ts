'use client'

import { mapApiProductToProduct } from '@/lib/utils/product-mapper'
import { Product } from '@/types/product'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { hikvisionAPI } from '../data/api'

/**
 * Agar sizda allaqachon ProductsParams tipi mavjud bo'lsa,
 * uni import qilavering yoki quyidagi tipni moslashtiring.
 */
type ProductsParams = {
	search?: string
	limit?: number
	offset?: number
	category?: string
	in_stock?: boolean
}

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
	search?: string
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

	// AbortController ref to cancel in-flight requests when options change
	const abortCtrlRef = useRef<AbortController | null>(null)

	// Normalize options: useMemo to avoid unnecessary re-renders
	const memoizedOptions = useMemo(
		() => ({
			search: options.search,
			limit: options.limit ?? 20,
			category: options.category,
			in_stock: options.in_stock,
		}),
		[options.search, options.limit, options.category, options.in_stock]
	)

	const fetchProducts = useCallback(
		async (params: ProductsParams = {}) => {
			// Cancel previous request if still running
			if (abortCtrlRef.current) {
				try {
					abortCtrlRef.current.abort()
				} catch (e) {
					// ignore
				}
			}

			const controller = new AbortController()
			abortCtrlRef.current = controller

			try {
				setLoading(true)
				setError(null)

				const requestParams = {
					limit: memoizedOptions.limit,
					offset: params.offset ?? 0,
					...memoizedOptions,
					...params,
				}

				console.log('[useProducts] fetching with', requestParams)

				// hikvisionAPI.getProducts should accept signal if it supports fetch/axios abort
				const response = await hikvisionAPI.getProducts({
					...requestParams,
					signal: controller.signal,
				} as any)

				// Basic validation
				if (
					!response ||
					typeof response !== 'object' ||
					!Array.isArray(response.results)
				) {
					throw new Error('Invalid API response format')
				}

				// Map API products to our Product type and filter invalids
				const mappedProducts: Product[] = response.results
					.map(mapApiProductToProduct)
					.filter((p): p is Product => !!p && !!p.id)

				// If offset is 0 we replace, otherwise append
				if ((params.offset ?? 0) === 0) {
					setProducts(mappedProducts)
				} else {
					setProducts(prev => {
						// avoid duplicates by id
						const ids = new Set(prev.map(p => p.id))
						const filteredToAdd = mappedProducts.filter(
							p => !ids.has(p.id)
						)
						return [...prev, ...filteredToAdd]
					})
				}

				setTotalCount(response.count ?? mappedProducts.length)
				setHasNext(Boolean(response.next))
				setHasPrevious(Boolean(response.previous))

				// Extract categories from mappedProducts (mapped form more reliable)
				const uniqueCategories = Array.from(
					new Set(
						mappedProducts
							.map(
								p =>
									(p as any).category?.name ??
									(p as any).category
							) // tolerate variations
							.filter(Boolean)
					)
				) as string[]

				setCategories(uniqueCategories)
			} catch (err) {
				// If aborted, don't treat as real error
				if ((err as any)?.name === 'AbortError') {
					console.log('[useProducts] fetch aborted')
					return
				}

				const errorMessage =
					err instanceof Error
						? err.message
						: 'Error fetching products'
				console.error('[useProducts] fetch error', err)
				setError(errorMessage)
				setProducts([])
				setCategories([])
				setTotalCount(0)
				setHasNext(false)
				setHasPrevious(false)
			} finally {
				setLoading(false)
				// clear controller if it's this request
				if (abortCtrlRef.current === controller)
					abortCtrlRef.current = null
			}
		},
		[memoizedOptions]
	)

	// Initial load and reload when memoizedOptions changes
	useEffect(() => {
		// reset offset when options change
		setOffset(0)
		fetchProducts({ offset: 0 })
		// cleanup on unmount: abort pending request
		return () => {
			if (abortCtrlRef.current) {
				try {
					abortCtrlRef.current.abort()
				} catch {}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [memoizedOptions, fetchProducts]) // fetchProducts already depends on memoizedOptions

	const loadMore = useCallback(() => {
		if (!hasNext || loading) return
		const newOffset = offset + (memoizedOptions.limit ?? 20)
		setOffset(newOffset)
		fetchProducts({ offset: newOffset })
	}, [hasNext, loading, offset, memoizedOptions.limit, fetchProducts])

	const refresh = useCallback(() => {
		setOffset(0)
		fetchProducts({ offset: 0 })
	}, [fetchProducts])

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
		search: memoizedOptions.search,
	}
}
