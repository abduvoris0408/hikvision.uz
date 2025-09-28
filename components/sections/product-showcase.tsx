// 'use client'

// import { Button } from '@/components/ui/button'
// import { ProductCardSkeleton } from '@/components/ui/loading-skeleton'
// import { ProductCard } from '@/components/ui/product-card'
// import { useProducts } from '@/lib/hooks/use-products'
// import { motion } from 'framer-motion'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { useTranslations } from 'next-intl'
// import Link from 'next/link'
// import { useState } from 'react'

// export function ProductShowcase() {
// 	const t = useTranslations()
// 	const { products, loading, getBestSellers } = useProducts()
// 	const [currentPage, setCurrentPage] = useState(0)
// 	const itemsPerPage = 4
// 	const maxItems = 8 // Limit to 8 products total

// 	const bestSellers = typeof getBestSellers === 'function' ? getBestSellers().slice(0, maxItems) : [] // Take only first 8 products
// 	const totalPages = Math.ceil(bestSellers.length / itemsPerPage)
// 	const currentProducts = bestSellers.slice(
// 		currentPage * itemsPerPage,
// 		(currentPage + 1) * itemsPerPage
// 	)

// 	const nextPage = () => {
// 		setCurrentPage(prev => (prev + 1) % totalPages)
// 	}

// 	const prevPage = () => {
// 		setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
// 	}

// 	if (loading) {
// 		return (
// 			<section className='py-16'>
// 				<div className='container mx-auto px-4'>
// 					<div className='text-center mb-12'>
// 						<div className='h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4' />
// 						<div className='h-4 bg-muted animate-pulse rounded w-96 mx-auto' />
// 					</div>
// 					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
// 						{Array.from({ length: 4 }).map((_, i) => (
// 							<ProductCardSkeleton key={i} />
// 						))}
// 					</div>
// 				</div>
// 			</section>
// 		)
// 	}

// 	return (
// 		<section className='py-16'>
// 			<div className='container mx-auto px-4'>
// 				{/* Section Header */}
// 				<div className='text-center mb-12'>
// 					<motion.h2
// 						initial={{ opacity: 0, y: 30 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						className='text-3xl md:text-4xl font-bold mb-4 text-balance'
// 					>
// 						{t('products.bestSellers')}
// 					</motion.h2>
// 					<motion.p
// 						initial={{ opacity: 0, y: 30 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						transition={{ delay: 0.2 }}
// 						viewport={{ once: true }}
// 						className='text-lg text-muted-foreground text-pretty max-w-2xl mx-auto'
// 					>
// 						Eng mashhur va ishonchli xavfsizlik kameralari va
// 						uskunalari
// 					</motion.p>
// 				</div>

// 				{/* Products Grid */}
// 				<div className='relative'>
// 					<motion.div
// 						key={currentPage}
// 						initial={{ opacity: 0, x: 50 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						transition={{ duration: 0.5 }}
// 						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'
// 					>
// 						{currentProducts.map((product, index) => (
// 							<motion.div
// 								key={product.id}
// 								initial={{ opacity: 0, y: 30 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ delay: index * 0.1 }}
// 							>
// 								<ProductCard product={product} />
// 							</motion.div>
// 						))}
// 					</motion.div>

// 					{/* Navigation */}
// 					{totalPages > 1 && (
// 						<div className='flex items-center justify-center gap-4 mb-8'>
// 							<Button
// 								variant='outline'
// 								size='icon'
// 								onClick={prevPage}
// 							>
// 								<ChevronLeft className='h-4 w-4' />
// 							</Button>
// 							<div className='flex gap-2'>
// 								{Array.from({ length: totalPages }).map(
// 									(_, index) => (
// 										<button
// 											key={index}
// 											className={`w-3 h-3 rounded-full transition-all ${
// 												index === currentPage
// 													? 'bg-primary scale-125'
// 													: 'bg-muted'
// 											}`}
// 											onClick={() =>
// 												setCurrentPage(index)
// 											}
// 										/>
// 									)
// 								)}
// 							</div>
// 							<Button
// 								variant='outline'
// 								size='icon'
// 								onClick={nextPage}
// 							>
// 								<ChevronRight className='h-4 w-4' />
// 							</Button>
// 						</div>
// 					)}
// 				</div>

// 				{/* Show More Button */}
// 				<div className='text-center mb-8'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ delay: 0.3 }}
// 					>
// 						<Link href='/products'>
// 							<Button
// 								size='lg'
// 								className='px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
// 							>
// 								Batafsil ko'rish
// 							</Button>
// 						</Link>
// 					</motion.div>
// 				</div>

// 				{/* Category Buttons */}
// 				<div className='text-center mt-12'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ delay: 0.4 }}
// 						className='flex flex-wrap justify-center gap-4 mb-8'
// 					>
// 						<Link href='/products?category=cameras'>
// 							<Button className='bg-secondary hover:bg-secondary/90 transition-all duration-300'>
// 								KAMERALAR
// 							</Button>
// 						</Link>
// 						<Link href='/products?category=intercoms'>
// 							<Button
// 								variant='outline'
// 								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
// 							>
// 								INTERKOMLAR
// 							</Button>
// 						</Link>
// 						<Link href='/products?category=turnstiles'>
// 							<Button
// 								variant='outline'
// 								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
// 							>
// 								TURNIKETLAR
// 							</Button>
// 						</Link>
// 					</motion.div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

'use client'

import { Button } from '@/components/ui/button'
import { ProductCardSkeleton } from '@/components/ui/loading-skeleton'
import { ProductCard } from '@/components/ui/product-card'
import { useProducts } from '@/lib/hooks/use-products'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function ProductShowcase() {
	const t = useTranslations()
	const { products, loading } = useProducts()
	const displayProducts = products.slice(0, 8)
	if (process.env.NODE_ENV === 'development') {
	}

	if (loading) {
		return (
			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<div className='h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4' />
						<div className='h-4 bg-muted animate-pulse rounded w-96 mx-auto' />
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{Array.from({ length: 4 }).map((_, i) => (
							<ProductCardSkeleton key={i} />
						))}
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className='py-16'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold mb-4 text-balance'
					>
						{t('products.featured')}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-muted-foreground text-pretty max-w-2xl mx-auto'
					>
						Eng mashhur va ishonchli xavfsizlik kameralari va
						uskunalari
					</motion.p>
				</div>

				{/* Products Grid */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'
				>
					{displayProducts.map((product, index) => (
						<motion.div
							key={`${product.id}-${index}`} // Combine id and index to ensure uniqueness
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
				</motion.div>

				{/* Show More Button */}
				<div className='text-center mb-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
					>
						<Link href='/products'>
							<Button
								size='lg'
								className='px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
							>
								Batafsil ko'rish
							</Button>
						</Link>
					</motion.div>
				</div>

				{/* Category Buttons */}
				<div className='text-center mt-12'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className='flex flex-wrap justify-center gap-4 mb-8'
					>
						<Link href='/products?category=cameras'>
							<Button className='bg-secondary hover:bg-secondary/90 transition-all duration-300'>
								KAMERALAR
							</Button>
						</Link>
						<Link href='/products?category=intercoms'>
							<Button
								variant='outline'
								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
							>
								INTERKOMLAR
							</Button>
						</Link>
						<Link href='/products?category=turnstiles'>
							<Button
								variant='outline'
								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
							>
								TURNIKETLAR
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
