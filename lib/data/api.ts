const BASE_URL = 'http://hikvision-back.khayitovdev.uz/api'

export interface ApiProduct {
	id: number
	category: {
		id: number
		name: string
		parent: number
		subcategories: string
	} | null
	tags: Array<{
		id: number
		name: string
	}>
	reviews: string
	name: string
	price: string
	in_stock: boolean
	short_description: string
	full_description: string
	image: string | null
	created_at: string
}

export interface ApiResponse<T> {
	count: number
	next: string | null
	previous: string | null
	results: T[]
}

export interface ProductsParams {
	search?: string
	limit?: number
	offset?: number
	category?: string
	in_stock?: boolean
}

class HikvisionAPI {
	private baseUrl: string

	constructor(baseUrl: string = BASE_URL) {
		this.baseUrl = baseUrl
	}

	async getProducts(
		params: ProductsParams = {}
	): Promise<ApiResponse<ApiProduct>> {
		const searchParams = new URLSearchParams()

		if (params.search) searchParams.append('search', params.search)
		if (params.limit) searchParams.append('limit', params.limit.toString())
		if (params.offset)
			searchParams.append('offset', params.offset.toString())
		if (params.category) searchParams.append('category', params.category)
		if (params.in_stock !== undefined)
			searchParams.append('in_stock', params.in_stock.toString())

		const url = `${this.baseUrl}/products/?${searchParams.toString()}`

		console.log('[v0] Making API request to:', url)

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			console.log('[v0] Response status:', response.status)

			if (!response.ok) {
				throw new Error(
					`HTTP error! status: ${response.status} - ${response.statusText}`
				)
			}

			const data = await response.json()
			console.log('[v0] Raw API response:', data)

			if (Array.isArray(data)) {
				// Non-paginated response (direct array)
				console.log('[v0] Detected non-paginated response')
				return {
					count: data.length,
					next: null,
					previous: null,
					results: data,
				}
			}

			if (!data || typeof data !== 'object') {
				throw new Error('Invalid response format from API')
			}

			if (!Array.isArray(data.results)) {
				console.warn(
					'[v0] Results is not an array, setting to empty array'
				)
				data.results = []
			}

			return data
		} catch (error) {
			console.error('[v0] API Error:', error)

			if (error instanceof TypeError && error.message.includes('fetch')) {
				throw new Error(
					'Network error: Unable to connect to the API. Please check your internet connection.'
				)
			}

			throw error
		}
	}

	async getProductById(id: number): Promise<ApiProduct> {
		const url = `${this.baseUrl}/products/${id}/`

		console.log('[v0] Making API request for product detail:', url)

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			console.log('[v0] Product detail response status:', response.status)

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Product not found')
				}
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			console.log('[v0] Product detail data:', data)
			return data
		} catch (error) {
			console.error('[v0] Product detail API Error:', error)
			throw error
		}
	}
}

export const hikvisionAPI = new HikvisionAPI()
