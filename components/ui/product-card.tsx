// 'use client'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import type { Product } from '@/lib/data/products'
// import { motion } from 'framer-motion'
// import { Heart, Star } from 'lucide-react'
// import { useLocale } from 'next-intl'
// import Image from 'next/image'
// import Link from 'next/link'
// import { memo, useState } from 'react'

// interface ProductCardProps {
// 	product: Product
// 	viewMode?: 'grid' | 'list'
// }

// export const ProductCard = memo(function ProductCard({
// 	product,
// 	viewMode = 'grid',
// }: ProductCardProps) {
// 	const locale = useLocale()
// 	const [isLiked, setIsLiked] = useState(false)

// 	const formatPrice = (price: number) => {
// 		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
// 	}

// 	const renderStars = (rating: number) => {
// 		return Array.from({ length: 5 }).map((_, i) => (
// 			<Star
// 				key={i}
// 				className={`h-4 w-4 ${
// 					i < Math.floor(rating)
// 						? 'fill-yellow-400 text-yellow-400'
// 						: 'text-gray-300'
// 				}`}
// 			/>
// 		))
// 	}

// 	if (viewMode === 'list') {
// 		return (
// 			<motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
// 				<Card className='group overflow-hidden hover:shadow-lg transition-all duration-300'>
// 					<div className='flex'>
// 						{/* Product Image */}
// 						<div className='relative w-48 h-32 shrink-0 overflow-hidden'>
// 							<Image
// 								src={product.image || '/placeholder.svg'}
// 								alt={product.name}
// 								fill
// 								className='object-cover transition-transform duration-300 group-hover:scale-105'
// 							/>
// 							{/* Overlay */}
// 							<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
// 						</div>

// 						<CardContent className='flex-1 p-4 flex justify-between'>
// 							<div className='space-y-2'>
// 								{/* Product Name */}
// 								<Link
// 									href={`/${locale}/products/${product.id}`}
// 								>
// 									<h3 className='font-semibold hover:text-secondary transition-colors line-clamp-2'>
// 										{product.name}
// 									</h3>
// 								</Link>

// 								{/* Rating */}
// 								<div className='flex items-center gap-2'>
// 									<div className='flex'>
// 										{renderStars(product.rating)}
// 									</div>
// 									<span className='text-xs text-muted-foreground'>
// 										{product.reviewCount} fikr-mulohaza
// 									</span>
// 								</div>

// 								{/* Price */}
// 								<div className='space-y-1'>
// 									<div className='text-lg font-bold text-red-600'>
// 										{formatPrice(product.price)}
// 									</div>
// 									{product.originalPrice && (
// 										<div className='text-sm text-muted-foreground line-through'>
// 											{formatPrice(product.originalPrice)}
// 										</div>
// 									)}
// 								</div>
// 							</div>

// 							{/* Actions */}
// 							<div className='flex flex-col gap-2 items-end'>
// 								<Button
// 									variant='ghost'
// 									size='icon'
// 									onClick={() => setIsLiked(!isLiked)}
// 								>
// 									<Heart
// 										className={`h-4 w-4 ${
// 											isLiked
// 												? 'fill-red-500 text-red-500'
// 												: 'text-muted-foreground'
// 										}`}
// 									/>
// 								</Button>
// 								<Button variant='outline' size='sm'>
// 									<Link
// 										href={`/${locale}/products/${product.id}`}
// 									>
// 										Batafsil
// 									</Link>
// 								</Button>
// 							</div>
// 						</CardContent>
// 					</div>
// 				</Card>
// 			</motion.div>
// 		)
// 	}

// 	return (
// 		<motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
// 			<Card className='group overflow-hidden hover:shadow-lg transition-all duration-300 relative'>
// 				{/* Badges */}
// 				<div className='absolute top-3 left-3 z-10 flex flex-col gap-2'>
// 					{product.isNew && (
// 						<Badge className='bg-green-500 hover:bg-green-600 text-white'>
// 							YANGI
// 						</Badge>
// 					)}
// 					{product.isBestSeller && (
// 						<Badge className='bg-red-500 hover:bg-red-600 text-white'>
// 							YANGI
// 						</Badge>
// 					)}
// 				</div>

// 				{/* Wishlist Button */}
// 				<Button
// 					variant='ghost'
// 					size='icon'
// 					className='absolute top-3 right-3 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm'
// 					onClick={() => setIsLiked(!isLiked)}
// 				>
// 					<Heart
// 						className={`h-4 w-4 ${
// 							isLiked
// 								? 'fill-red-500 text-red-500'
// 								: 'text-muted-foreground'
// 						}`}
// 					/>
// 				</Button>

// 				{/* Product Image */}
// 				<div className='relative  h-48 w-full overflow-hidden'>
// 					<Image
// 						src={product.image || '/placeholder.svg'}
// 						alt={product.name}
// 						fill
// 						className='object-cover transition-transform duration-300 group-hover:scale-105'
// 					/>
// 					<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
// 				</div>

// 				<CardContent className='p-4 space-y-3'>
// 					{/* Product Name */}
// 					<Link href={`/${locale}/products/${product.id}`}>
// 						<h3 className='font-semibold text-sm hover:text-secondary transition-colors line-clamp-2'>
// 							{product.name}
// 						</h3>
// 					</Link>

// 					{/* Rating */}
// 					<div className='flex items-center gap-2'>
// 						<div className='flex'>
// 							{renderStars(product.rating)}
// 						</div>
// 						<span className='text-xs text-muted-foreground'>
// 							{product.reviewCount} fikr-mulohaza
// 						</span>
// 					</div>

// 					{/* Price */}
// 					<div className='space-y-1'>
// 						<div className='text-lg font-bold text-red-600'>
// 							{formatPrice(product.price)}
// 						</div>
// 						{product.originalPrice && (
// 							<div className='text-sm text-muted-foreground line-through'>
// 								{formatPrice(product.originalPrice)}
// 							</div>
// 						)}
// 					</div>

// 					{/* Actions */}
// 					<div className='flex gap-2 pt-2'>
// 						<Button variant='outline' size='sm' className='w-full '>
// 							<Link href={`/${locale}/products/${product.id}`}>
// 								Batafsil
// 							</Link>
// 						</Button>
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</motion.div>
// 	)
// })

'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Product } from '@/lib/data/products'
import { motion } from 'framer-motion'
import { Heart, Percent, Star } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'

interface ProductCardProps {
	product: Product
	viewMode?: 'grid' | 'list'
}

export const ProductCard = memo(function ProductCard({
	product,
	viewMode = 'grid',
}: ProductCardProps) {
	const locale = useLocale()
	const [isLiked, setIsLiked] = useState(false)

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	// Chegirma foizini hisoblash
	const calculateDiscountPercentage = (original: number, current: number) => {
		return Math.round(((original - current) / original) * 100)
	}

	const hasDiscount =
		typeof product.originalPrice === 'number' && product.originalPrice > product.price
	const discountPercentage = hasDiscount && typeof product.originalPrice === 'number'
		? calculateDiscountPercentage(product.originalPrice, product.price)
		: 0

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < Math.floor(rating)
						? 'fill-yellow-400 text-yellow-400'
						: 'text-gray-300'
				}`}
			/>
		))
	}

	if (viewMode === 'list') {
		return (
			<motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
				<Card className='group overflow-hidden hover:shadow-lg transition-all duration-300'>
					<div className='flex'>
						{/* Product Image */}
						<div className='relative w-48 h-32 shrink-0 overflow-hidden'>
							<Image
								src={product.image || '/placeholder.svg'}
								alt={product.name}
								fill
								className='object-cover transition-transform duration-300 group-hover:scale-105'
							/>
							{/* Discount Badge */}
							{hasDiscount && (
								<div className='absolute top-2 left-2 z-10'>
									<Badge className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-2 py-1 rounded-full shadow-lg'>
										<Percent className='h-3 w-3 mr-1' />-
										{discountPercentage}%
									</Badge>
								</div>
							)}
							{/* Overlay */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
						</div>

						<CardContent className='flex-1 p-4 flex justify-between'>
							<div className='space-y-2'>
								{/* Product Name */}
								<Link
									href={`/${locale}/products/${product.id}`}
								>
									<h3 className='font-semibold hover:text-secondary transition-colors line-clamp-2'>
										{product.name}
									</h3>
								</Link>

								{/* Rating */}
								<div className='flex items-center gap-2'>
									<div className='flex'>
										{renderStars(product.rating)}
									</div>
									<span className='text-xs text-muted-foreground'>
										{product.reviewCount} fikr-mulohaza
									</span>
								</div>

								{/* Price */}
								<div className='space-y-1'>
									{hasDiscount ? (
										<div className='flex items-center gap-3'>
											<div className='text-lg font-bold text-red-600'>
												{formatPrice(product.price)}
											</div>
											<div className='relative'>
												<div className='text-sm text-gray-400 line-through decoration-1 decoration-gray-400'>
													{product.originalPrice !== undefined && formatPrice(product.originalPrice)}
												</div>
											</div>
										</div>
									) : (
										<div className='text-lg font-bold text-red-600'>
											{formatPrice(product.price)}
										</div>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className='flex flex-col gap-2 items-end'>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setIsLiked(!isLiked)}
								>
									<Heart
										className={`h-4 w-4 ${
											isLiked
												? 'fill-red-500 text-red-500'
												: 'text-muted-foreground'
										}`}
									/>
								</Button>
								<Button variant='outline' size='sm'>
									<Link
										href={`/${locale}/products/${product.id}`}
									>
										Batafsil
									</Link>
								</Button>
							</div>
						</CardContent>
					</div>
				</Card>
			</motion.div>
		)
	}

	return (
		<motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
			<Card className='group overflow-hidden hover:shadow-lg transition-all duration-300 relative'>
				{/* Badges */}
				<div className='absolute top-3 left-3 z-10 flex flex-col gap-2'>
					{product.isNew && (
						<Badge className='bg-green-500 hover:bg-green-600 text-white'>
							YANGI
						</Badge>
					)}
					{product.isBestSeller && (
						<Badge className='bg-blue-500 hover:bg-blue-600 text-white'>
							TOP SOTUVCHI
						</Badge>
					)}
					{hasDiscount && (
						<Badge className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-2 py-1 rounded-full shadow-lg animate-pulse'>
							<Percent className='h-3 w-3 mr-1' />-
							{discountPercentage}%
						</Badge>
					)}
				</div>

				{/* Wishlist Button */}
				<Button
					variant='ghost'
					size='icon'
					className='absolute top-3 right-3 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm'
					onClick={() => setIsLiked(!isLiked)}
				>
					<Heart
						className={`h-4 w-4 ${
							isLiked
								? 'fill-red-500 text-red-500'
								: 'text-muted-foreground'
						}`}
					/>
				</Button>

				{/* Product Image */}
				<div className='relative h-48 w-full overflow-hidden'>
					<Image
						src={product.image || '/placeholder.svg'}
						alt={product.name}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-105'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
				</div>

				<CardContent className='p-4 space-y-3'>
					{/* Product Name */}
					<Link href={`/${locale}/products/${product.id}`}>
						<h3 className='font-semibold text-sm hover:text-secondary transition-colors line-clamp-2'>
							{product.name}
						</h3>
					</Link>

					{/* Rating */}
					<div className='flex items-center gap-2'>
						<div className='flex'>
							{renderStars(product.rating)}
						</div>
						<span className='text-xs text-muted-foreground'>
							{product.reviewCount} fikr-mulohaza
						</span>
					</div>

					{/* Price */}
					<div className='space-y-2'>
						{hasDiscount ? (
							<div className='flex items-center gap-3'>
								<div className='text-lg font-bold text-red-600'>
									{formatPrice(product.price)}
								</div>
								<div className='text-sm text-gray-400 line-through decoration-1 decoration-gray-400'>
									{product.originalPrice !== undefined && formatPrice(product.originalPrice)}
								</div>
							</div>
						) : (
							<div className='text-lg font-bold text-red-600'>
								{formatPrice(product.price)}
							</div>
						)}
					</div>

					{/* Actions */}
					<div className='flex gap-2 pt-2'>
						<Button
							variant={hasDiscount ? 'default' : 'outline'}
							size='sm'
							className={`w-full ${
								hasDiscount
									? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
									: ''
							}`}
						>
							<Link href={`/${locale}/products/${product.id}`}>
								{hasDiscount
									? 'Chegirma bilan olish'
									: 'Batafsil'}
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
})
