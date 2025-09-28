'use client'

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

type CartItem = {
	id: string | number
	quantity?: number
}

type CartContextType = {
	cart: CartItem[]
	cartCount: number // unique product count
	addToCart: (item: CartItem) => void
	removeFromCart: (id: string | number) => void
	clearCart: () => void
	updateQuantity: (id: string | number, quantity: number) => void
	setCartManually: (items: CartItem[]) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// localStorage kalit nomi
const CART_STORAGE_KEY = 'hikvision_cart'

export const CartProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([])
	const [isLoaded, setIsLoaded] = useState(false) // localStorage yuklash holati

	// Initial load from localStorage
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const savedCart = localStorage.getItem(CART_STORAGE_KEY)
			if (savedCart) {
				const parsed = JSON.parse(savedCart) as CartItem[]
				if (Array.isArray(parsed)) {
					console.log('Cart loaded from localStorage:', parsed)
					setCart(parsed)
				}
			}
		} catch (error) {
			console.error('Error loading cart from localStorage:', error)
		} finally {
			setIsLoaded(true)
		}
	}, [])

	// Save to localStorage when cart changes (faqat load qilingandan keyin)
	useEffect(() => {
		if (!isLoaded) return // localStorage dan yuklanguncha saqlamaslik

		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
			console.log('Cart saved to localStorage:', cart)
		} catch (error) {
			console.error('Error saving cart to localStorage:', error)
		}
	}, [cart, isLoaded])

	const setCartManually = useCallback((items: CartItem[]) => {
		console.log('Setting cart manually:', items)
		setCart(items)
	}, [])

	const addToCart = useCallback((item: CartItem) => {
		console.log('Adding item to cart:', item)
		setCart(prev => {
			// ID ni string ga o'tkazib solishtiramiz
			const itemId = String(item.id)
			const exists = prev.some(p => String(p.id) === itemId)

			if (exists) {
				console.log('Item already exists in cart')
				return prev // Agar mahsulot mavjud bo'lsa, takrorlamaymiz
			}

			const newCart = [...prev, { ...item, id: itemId }]
			console.log('New cart after adding:', newCart)
			return newCart
		})
	}, [])

	const removeFromCart = useCallback((id: string | number) => {
		console.log('Removing item from cart:', id)
		const itemId = String(id)
		setCart(prev => {
			const newCart = prev.filter(p => String(p.id) !== itemId)
			console.log('New cart after removing:', newCart)
			return newCart
		})
	}, [])

	const clearCart = useCallback(() => {
		console.log('Clearing cart')
		setCart([])
	}, [])

	// Quantity ni yangilash funksiyasi
	const updateQuantity = useCallback(
		(id: string | number, quantity: number) => {
			console.log('Updating quantity:', id, quantity)
			const itemId = String(id)
			setCart(prev => {
				const newCart = prev.map(item => {
					if (String(item.id) === itemId) {
						return { ...item, quantity: Math.max(1, quantity) }
					}
					return item
				})
				console.log('Cart after quantity update:', newCart)
				return newCart
			})
		},
		[]
	)

	// Unique product count
	const cartCount = useMemo(() => {
		const count = cart.length // Har bir element unique, shuning uchun length yetarli
		console.log('Cart count calculated:', count, 'Items:', cart)
		return count
	}, [cart])

	const value = useMemo(
		() => ({
			cart,
			cartCount,
			addToCart,
			removeFromCart,
			clearCart,
			updateQuantity,
			setCartManually,
		}),
		[
			cart,
			cartCount,
			addToCart,
			removeFromCart,
			clearCart,
			updateQuantity,
			setCartManually,
		]
	)

	// Agar hali localStorage dan yuklanmagan bo'lsa, loading ko'rsatish (ixtiyoriy)
	if (!isLoaded) {
		return (
			<CartContext.Provider
				value={{
					cart: [],
					cartCount: 0,
					addToCart: () => {},
					removeFromCart: () => {},
					clearCart: () => {},
					updateQuantity: () => {},
					setCartManually: () => {},
				}}
			>
				{children}
			</CartContext.Provider>
		)
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
	const ctx = useContext(CartContext)
	if (!ctx) {
		throw new Error('useCart must be used inside CartProvider')
	}
	return ctx
}
