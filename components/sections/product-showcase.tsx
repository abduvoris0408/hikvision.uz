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
						{t('products.description')}
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
								{t('products.viewMore')}
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
								{t('products.categoryNames.cameras')}
							</Button>
						</Link>
						<Link href='/products?category=intercoms'>
							<Button
								variant='outline'
								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
							>
								{t('products.categoryNames.intercoms')}
							</Button>
						</Link>
						<Link href='/products?category=turnstiles'>
							<Button
								variant='outline'
								className='bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 transition-all duration-300'
							>
								{t('products.categoryNames.turnstiles')}
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
