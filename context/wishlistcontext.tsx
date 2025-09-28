'use client'

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

type WishlistItem = {
	id: string | number
	name: string
	price: number
	originalPrice?: number
	image?: string
	isNew?: boolean
	isBestSeller?: boolean
	reviews?: any[]
}

type WishlistContextType = {
	wishlist: WishlistItem[]
	wishlistCount: number
	addToWishlist: (item: WishlistItem) => void
	removeFromWishlist: (id: string | number) => void
	clearWishlist: () => void
	isInWishlist: (id: string | number) => boolean
	toggleWishlist: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
)

// localStorage kalit nomi
const WISHLIST_STORAGE_KEY = 'hikvision_wishlist'

export const WishlistProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [wishlist, setWishlist] = useState<WishlistItem[]>([])
	const [isLoaded, setIsLoaded] = useState(false)

	// Initial load from localStorage
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
			if (savedWishlist) {
				const parsed = JSON.parse(savedWishlist) as WishlistItem[]
				if (Array.isArray(parsed)) {
					console.log('Wishlist loaded from localStorage:', parsed)
					setWishlist(parsed)
				}
			}
		} catch (error) {
			console.error('Error loading wishlist from localStorage:', error)
		} finally {
			setIsLoaded(true)
		}
	}, [])

	// Save to localStorage when wishlist changes
	useEffect(() => {
		if (!isLoaded) return

		try {
			localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
			console.log('Wishlist saved to localStorage:', wishlist)
		} catch (error) {
			console.error('Error saving wishlist to localStorage:', error)
		}
	}, [wishlist, isLoaded])

	const addToWishlist = useCallback((item: WishlistItem) => {
		console.log('Adding item to wishlist:', item)
		setWishlist(prev => {
			const itemId = String(item.id)
			const exists = prev.some(p => String(p.id) === itemId)

			if (exists) {
				console.log('Item already exists in wishlist')
				return prev
			}

			const newWishlist = [...prev, { ...item, id: itemId }]
			console.log('New wishlist after adding:', newWishlist)
			return newWishlist
		})
	}, [])

	const removeFromWishlist = useCallback((id: string | number) => {
		console.log('Removing item from wishlist:', id)
		const itemId = String(id)
		setWishlist(prev => {
			const newWishlist = prev.filter(p => String(p.id) !== itemId)
			console.log('New wishlist after removing:', newWishlist)
			return newWishlist
		})
	}, [])

	const clearWishlist = useCallback(() => {
		console.log('Clearing wishlist')
		setWishlist([])
	}, [])

	const isInWishlist = useCallback(
		(id: string | number) => {
			const itemId = String(id)
			return wishlist.some(item => String(item.id) === itemId)
		},
		[wishlist]
	)

	const toggleWishlist = useCallback(
		(item: WishlistItem) => {
			const itemId = String(item.id)
			if (isInWishlist(itemId)) {
				removeFromWishlist(itemId)
			} else {
				addToWishlist(item)
			}
		},
		[isInWishlist, removeFromWishlist, addToWishlist]
	)

	const wishlistCount = useMemo(() => {
		return wishlist.length
	}, [wishlist])

	const value = useMemo(
		() => ({
			wishlist,
			wishlistCount,
			addToWishlist,
			removeFromWishlist,
			clearWishlist,
			isInWishlist,
			toggleWishlist,
		}),
		[
			wishlist,
			wishlistCount,
			addToWishlist,
			removeFromWishlist,
			clearWishlist,
			isInWishlist,
			toggleWishlist,
		]
	)

	if (!isLoaded) {
		return (
			<WishlistContext.Provider
				value={{
					wishlist: [],
					wishlistCount: 0,
					addToWishlist: () => {},
					removeFromWishlist: () => {},
					clearWishlist: () => {},
					isInWishlist: () => false,
					toggleWishlist: () => {},
				}}
			>
				{children}
			</WishlistContext.Provider>
		)
	}

	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	)
}

export const useWishlist = (): WishlistContextType => {
	const ctx = useContext(WishlistContext)
	if (!ctx) {
		throw new Error('useWishlist must be used inside WishlistProvider')
	}
	return ctx
}
