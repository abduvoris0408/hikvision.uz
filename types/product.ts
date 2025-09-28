export interface Product {
	id: string
	name: string
	description?: string
	shortDescription?: string
	fullDescription?: string
	price: number
	originalPrice?: number
	image?: string
	images?: string[]
	in_stock: boolean
	isNew?: boolean
	isBestSeller?: boolean
	reviews?: Review[]
	category?: string
	brand?: string
	specifications?: Specification[]
	tags?: string[]
	createdAt?: string
	updatedAt?: string
}
export type ProductCategory = string
export type SortOption =
	| 'name'
	| 'price-low'
	| 'price-high'
	| 'rating'
	| 'newest'

// types/product.ts

export interface Specification {
	name: string
	value: string
	unit?: string
}

// CartContext bilan mos keluvchi CartItem turi
export interface CartItem {
	id: string | number
	quantity?: number
	// Qo'shimcha maydonlar kerak bo'lsa qo'shishingiz mumkin
	name?: string
	price?: number
	image?: string
	addedAt?: number
}

// ProductDetail komponent props
export interface ProductDetailProps {
	product: Product
}

// Mahsulot detali uchun state turlari
export interface ProductDetailState {
	selectedImageIndex: number
	isLiked: boolean
	quantity: number
	productData: Product
	isInCart: boolean
}

// API response turlari
export interface ApiResponse<T> {
	success: boolean
	data: T
	message?: string
	error?: string
}
// types/checkout.ts
export interface CheckoutFormData {
	firstName: string
	lastName: string
	phoneNumber: string
}

export interface CheckoutFormErrors {
	firstName?: string
	lastName?: string
	phoneNumber?: string
	general?: string
}

// API uchun checkout ma'lumotlari
export interface CheckoutData {
	full_name: string
	phone_number: string
	items: CheckoutItem[]
}

export interface CheckoutItem {
	product_id: number
	quantity: number
}

// CheckoutPage props
export interface CheckoutPageProps {
	onBack: () => void
	onSuccess: () => void
}

// Product interface (CartContext bilan mos kelishi uchun)
export interface CheckoutProduct {
	id: string | number
	name: string
	price: number
	image?: string
	description?: string
	shortDescription?: string
	rating?: number
	reviewCount?: number
	inStock?: boolean
	isNew?: boolean
	isBestSeller?: boolean
	category?: string
}

// Checkout sahifasidagi cart item (CartContext dan kelgan ma'lumotlar bilan)
export interface CheckoutCartItem {
	id: string | number
	quantity: number
	// Qo'shimcha ma'lumotlar product ma'lumotlaridan olinadi
	name?: string
	price?: number
	image?: string
}

// CheckoutPage component state
export interface CheckoutPageState {
	formData: CheckoutFormData
	formErrors: CheckoutFormErrors
	isSuccess: boolean
	isLoadingCart: boolean
}

// useCheckout hook turlari
export interface UseCheckoutReturn {
	isLoading: boolean
	error: string | null
	success: boolean
	submitOrder: (data: CheckoutData) => Promise<void>
	clearError: () => void
	clearSuccess: () => void
}

// API response turlari
export interface CheckoutApiResponse {
	success: boolean
	message?: string
	order_id?: string | number
	error?: string
}
export type Review = {
  id: string | number
  name: string
  message: string
  rating?: number
  created_at?: string
}
export interface ProductApiResponse extends ApiResponse<Product> {}

export interface ReviewsApiResponse extends ApiResponse<Review[]> {}
