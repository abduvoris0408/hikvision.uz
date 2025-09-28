'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/wishlistcontext'

import { AnimatePresence, motion } from 'framer-motion'
import {
	Grid3X3,
	Heart,
	HeartOff,
	List,
	Percent,
	ShoppingCart,
	Star,
	Trash2,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function WishlistPage() {
	const locale = useLocale()
	const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } =
		useWishlist()
	const { addToCart } = useCart()
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	const calculateDiscountPercentage = (original: number, current: number) => {
		return Math.round(((original - current) / original) * 100)
	}

	const calculateAverageRating = (reviews: any[]) => {
		if (!reviews || reviews.length === 0) return 0
		const totalRating = reviews.reduce(
			(sum, review) => sum + (review.rating || 0),
			0
		)
		return Math.round((totalRating / reviews.length) * 10) / 10
	}

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

	const handleAddToCart = (item: any) => {
		addToCart({ id: item.id, quantity: 1 })
		// Toast notification qo'shishingiz mumkin
	}

	if (wishlist.length === 0) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50'>
				<div className='container mx-auto px-4 py-8'>
					{/* Header */}
					<div className='flex items-center justify-between mb-8'>
						<div className='flex items-center gap-4'>
							<div>
								<h1 className='text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent'>
									Sevimlilar ro'yxati
								</h1>
								<p className='text-muted-foreground'>
									Sizning sevimli mahsulotlaringiz
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<Heart className='h-6 w-6 text-pink-500' />
							<span className='text-lg font-semibold'>
								{wishlistCount}
							</span>
						</div>
					</div>

					{/* Empty State */}
					<div className='flex flex-col items-center justify-center py-20'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5, type: 'spring' }}
							className='w-32 h-32 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mb-6'
						>
							<HeartOff className='h-16 w-16 text-pink-400' />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='text-center space-y-4'
						>
							<h2 className='text-2xl font-semibold text-gray-800'>
								Sevimlilar ro'yxati bo'sh
							</h2>
							<p className='text-gray-600 max-w-md'>
								Hozircha hech qanday mahsulot sevimlilar
								ro'yxatiga qo'shilmagan. Mahsulotlarni ko'rish
								va yoqtirishni boshlang!
							</p>

							<Button
								asChild
								size='lg'
								className='bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full mt-6'
							>
								<Link href={`/${locale}/products`}>
									<Heart className='h-5 w-5 mr-2' />
									Mahsulotlarni ko'rish
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8'>
					<div className='flex items-center gap-4'>
						<div>
							<h1 className='text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent'>
								Sevimlilar ro'yxati
							</h1>
							<p className='text-muted-foreground'>
								{wishlistCount} ta sevimli mahsulot
							</p>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						{/* View Mode Toggle */}
						<div className='flex bg-white rounded-lg p-1 shadow-sm border'>
							<Button
								variant={
									viewMode === 'grid' ? 'default' : 'ghost'
								}
								size='sm'
								onClick={() => setViewMode('grid')}
								className='rounded-md'
							>
								<Grid3X3 className='h-4 w-4' />
							</Button>
							<Button
								variant={
									viewMode === 'list' ? 'default' : 'ghost'
								}
								size='sm'
								onClick={() => setViewMode('list')}
								className='rounded-md'
							>
								<List className='h-4 w-4' />
							</Button>
						</div>

						{/* Actions */}

						<Button
							variant='destructive'
							size='sm'
							onClick={clearWishlist}
							className='bg-red-500 hover:bg-red-600'
						>
							<Trash2 className='h-4 w-4 mr-2' />
							Hammasini o'chirish
						</Button>
					</div>
				</div>

				{/* Products Grid */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={viewMode}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className={
							viewMode === 'grid'
								? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
								: 'space-y-4'
						}
					>
						{wishlist.map((item, index) => {
							const hasDiscount =
								typeof item.originalPrice === 'number' &&
								item.originalPrice > item.price
							const discountPercentage =
								hasDiscount &&
								typeof item.originalPrice === 'number'
									? calculateDiscountPercentage(
											item.originalPrice,
											item.price
									  )
									: 0
							const averageRating = calculateAverageRating(
								item.reviews || []
							)
							const reviewCount = (item.reviews || []).length

							if (viewMode === 'list') {
								return (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ delay: index * 0.1 }}
										whileHover={{ x: 5 }}
									>
										<Card className='group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-pink-100'>
											<div className='flex'>
												{/* Product Image */}
												<div className='relative w-48 h-32 shrink-0 overflow-hidden'>
													<Image
														src={
															item.image ||
															'/placeholder.svg'
														}
														alt={item.name}
														fill
														className='object-cover transition-transform duration-300 group-hover:scale-105'
													/>
													{hasDiscount && (
														<div className='absolute top-2 left-2 z-10'>
															<Badge className='bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-2 py-1 rounded-full shadow-lg animate-pulse'>
																<Percent className='h-3 w-3 mr-1' />
																-
																{
																	discountPercentage
																}
																%
															</Badge>
														</div>
													)}
													<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
												</div>

												<CardContent className='flex-1 p-4 flex justify-between'>
													<div className='space-y-2'>
														<Link
															href={`/${locale}/products/${item.id}`}
														>
															<h3 className='font-semibold hover:text-pink-600 transition-colors line-clamp-2'>
																{item.name}
															</h3>
														</Link>

														<div className='flex items-center gap-2'>
															<div className='flex'>
																{renderStars(
																	averageRating
																)}
															</div>
															<span className='text-xs text-muted-foreground'>
																{reviewCount >
																0 ? (
																	<>
																		{averageRating.toFixed(
																			1
																		)}{' '}
																		(
																		{
																			reviewCount
																		}
																		)
																	</>
																) : (
																	"Hali baholar yo'q"
																)}
															</span>
														</div>

														<div className='space-y-1'>
															{hasDiscount ? (
																<div className='flex items-center gap-3'>
																	<div className='text-lg font-bold text-red-600'>
																		{formatPrice(
																			Number(
																				item.price
																			)
																		)}
																	</div>
																	<div className='text-sm text-gray-400 line-through'>
																		{item.originalPrice &&
																			formatPrice(
																				item.originalPrice
																			)}
																	</div>
																</div>
															) : (
																<div className='text-lg font-bold text-red-600'>
																	{formatPrice(
																		Number(
																			item.price
																		)
																	)}
																</div>
															)}
														</div>
													</div>

													<div className='flex flex-col gap-2 items-end'>
														<Button
															variant='ghost'
															size='icon'
															onClick={() =>
																removeFromWishlist(
																	item.id
																)
															}
															className='text-red-500 hover:text-red-600 hover:bg-red-50'
														>
															<Heart className='h-4 w-4 fill-current' />
														</Button>
														<Button
															variant='outline'
															size='sm'
															onClick={() =>
																handleAddToCart(
																	item
																)
															}
														>
															<ShoppingCart className='h-4 w-4 mr-2' />
															Savatga
														</Button>
													</div>
												</CardContent>
											</div>
										</Card>
									</motion.div>
								)
							}

							return (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -8 }}
								>
									<Card className='group overflow-hidden hover:shadow-xl transition-all duration-300 relative bg-white/80 backdrop-blur-sm border-pink-100'>
										{/* Badges */}
										<div className='absolute top-3 left-3 z-10 flex flex-col gap-2'>
											{item.isNew && (
												<Badge className='bg-green-500 hover:bg-green-600 text-white'>
													YANGI
												</Badge>
											)}
											{item.isBestSeller && (
												<Badge className='bg-blue-500 hover:bg-blue-600 text-white'>
													TOP
												</Badge>
											)}
											{hasDiscount && (
												<Badge className='bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-2 py-1 rounded-full shadow-lg animate-pulse'>
													<Percent className='h-3 w-3 mr-1' />
													-{discountPercentage}%
												</Badge>
											)}
										</div>

										{/* Wishlist Button */}
										<Button
											variant='ghost'
											size='icon'
											className='absolute top-3 right-3 z-10 bg-white/90 hover:bg-white backdrop-blur-sm text-red-500 hover:text-red-600'
											onClick={() =>
												removeFromWishlist(item.id)
											}
										>
											<Heart className='h-4 w-4 fill-current' />
										</Button>

										{/* Product Image */}
										<div className='relative h-48 w-full overflow-hidden'>
											<Image
												src={
													item.image ||
													'/placeholder.svg'
												}
												alt={item.name}
												fill
												className='object-cover transition-transform duration-300 group-hover:scale-110'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
										</div>

										<CardContent className='p-4 space-y-3'>
											<Link
												href={`/${locale}/products/${item.id}`}
											>
												<h3 className='font-semibold text-sm hover:text-pink-600 transition-colors line-clamp-2'>
													{item.name}
												</h3>
											</Link>

											<div className='flex items-center gap-2'>
												<div className='flex'>
													{renderStars(averageRating)}
												</div>
												<span className='text-xs text-muted-foreground'>
													{reviewCount > 0 ? (
														<>
															{averageRating.toFixed(
																1
															)}{' '}
															({reviewCount})
														</>
													) : (
														"Baholar yo'q"
													)}
												</span>
											</div>

											<div className='space-y-2'>
												{hasDiscount ? (
													<div className='flex items-center gap-3'>
														<div className='text-lg font-bold text-red-600'>
															{formatPrice(
																Number(
																	item.price
																)
															)}
														</div>
														<div className='text-sm text-gray-400 line-through'>
															{item.originalPrice &&
																formatPrice(
																	item.originalPrice
																)}
														</div>
													</div>
												) : (
													<div className='text-lg font-bold text-red-600'>
														{formatPrice(
															Number(item.price)
														)}
													</div>
												)}
											</div>

											<div className='flex gap-2 pt-2'>
												<Button
													variant='outline'
													size='sm'
													className='flex-1'
													onClick={() =>
														handleAddToCart(item)
													}
												>
													<ShoppingCart className='h-4 w-4 mr-2' />
													Savatga
												</Button>
												<Button
													variant={
														hasDiscount
															? 'default'
															: 'outline'
													}
													size='sm'
													className={`flex-1 ${
														hasDiscount
															? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600'
															: ''
													}`}
													asChild
												>
													<Link
														href={`/${locale}/products/${item.id}`}
													>
														Batafsil
													</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							)
						})}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
