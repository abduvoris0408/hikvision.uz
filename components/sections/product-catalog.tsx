'use client'

import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ui/product-card'
import { ProductCatalogSkeleton } from '@/components/ui/product-catalog-skeleton'
import { ProductFilters } from '@/components/ui/product-filters'
import { ProductSearch } from '@/components/ui/product-search'
import { ProductSort } from '@/components/ui/product-sort'

import { useDebounce } from '@/lib/hooks/use-debounce'
import { useProducts } from '@/lib/hooks/use-products'
import { Product, ProductCategory, SortOption } from '@/types/product'

import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'

export function ProductCatalog() {
	const t = useTranslations('products')

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<
		ProductCategory | 'all'
	>('all')
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
	const [sortBy, setSortBy] = useState<SortOption>('name')
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [showFilters, setShowFilters] = useState(false)

	const debouncedSearchQuery = useDebounce(searchQuery, 300)

	const {
		products: allProducts,
		categories,
		loading,
		error,
	} = useProducts({
		limit: 100,
		search: debouncedSearchQuery || undefined,
		category: selectedCategory !== 'all' ? selectedCategory : undefined,
	})

	const filterProducts = useCallback(
		(
			products: Product[],
			query: string,
			category: ProductCategory | 'all',
			range: [number, number]
		) => {
			return products.filter((product: Product) => {
				// Search filter
				if (
					query &&
					!product.name.toLowerCase().includes(query.toLowerCase())
				) {
					return false
				}

				// Category filter
				if (category !== 'all' && product.category !== category) {
					return false
				}

				// Price range filter
				if (product.price < range[0] || product.price > range[1]) {
					return false
				}

				return true
			})
		},
		[]
	)

	const sortProducts = useCallback(
		(products: Product[], sortBy: SortOption) => {
			return [...products].sort((a: Product, b: Product) => {
				switch (sortBy) {
					case 'price-low':
						return a.price - b.price
					case 'price-high':
						return b.price - a.price
					case 'rating':
						return b.rating - a.rating
					case 'newest':
						return (
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
						)
					default:
						return a.name.localeCompare(b.name)
				}
			})
		},
		[]
	)

	const filteredProducts = useMemo(() => {
		const filtered = filterProducts(
			allProducts,
			debouncedSearchQuery,
			selectedCategory,
			priceRange
		)
		return sortProducts(filtered, sortBy)
	}, [
		allProducts,
		debouncedSearchQuery,
		selectedCategory,
		priceRange,
		sortBy,
		filterProducts,
		sortProducts,
	])

	// Create unique products to avoid duplicate keys
	const uniqueFilteredProducts = useMemo(() => {
		const uniqueMap = new Map<string, Product>()
		filteredProducts.forEach(product => {
			const key = `${product.id}-${product.name}-${product.category}`
			if (!uniqueMap.has(key)) {
				uniqueMap.set(key, product)
			}
		})
		return Array.from(uniqueMap.values())
	}, [filteredProducts])

	const handleClearFilters = useCallback(() => {
		setSearchQuery('')
		setSelectedCategory('all')
		setPriceRange([0, 5000000])
	}, [])

	const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
		setViewMode(mode)
	}, [])

	if (loading) {
		return <ProductCatalogSkeleton />
	}

	if (error) {
		return (
			<div className='text-center py-12'>
				<div className='text-destructive mb-4'>
					Xatolik yuz berdi: {error}
				</div>
				<Button onClick={() => window.location.reload()}>
					Qayta yuklash
				</Button>
			</div>
		)
	}

	return (
		<div className='w-full space-y-6'>
			{/* Search and Controls */}
			<div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-4 lg:items-center lg:justify-between'>
				<div className='w-full max-w-md'>
					{/* <ProductSearch
						value={searchQuery}
						onChange={setSearchQuery}
					/> */}
					<h1 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
							Hikvision Mahsulotlari
						</h1>
				</div>

				<div className='flex flex-wrap items-center gap-3'>
					<div className='flex-shrink-0'>
						<ProductSort value={sortBy} onChange={setSortBy} />
					</div>

					{/* View Mode Toggle */}
					<div className='flex border rounded-lg p-1 flex-shrink-0'>
						<Button
							variant={viewMode === 'grid' ? 'default' : 'ghost'}
							size='sm'
							onClick={() => handleViewModeChange('grid')}
							className='px-3'
						>
							<Grid className='h-4 w-4' />
						</Button>
						<Button
							variant={viewMode === 'list' ? 'default' : 'ghost'}
							size='sm'
							onClick={() => handleViewModeChange('list')}
							className='px-3'
						>
							<List className='h-4 w-4' />
						</Button>
					</div>

					{/* Mobile Filter Toggle */}
					<Button
						variant='outline'
						size='sm'
						onClick={() => setShowFilters(!showFilters)}
						className='lg:hidden flex-shrink-0'
					>
						<Filter className='h-4 w-4 mr-2' />
						{t('filters')}
					</Button>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
				{/* Filters Sidebar - Mobile Overlay / Desktop Sidebar */}
				<div
					className={`
          ${showFilters ? 'block' : 'hidden'} 
          lg:block 
          w-full 
          lg:w-64 
          lg:flex-shrink-0
          ${
				showFilters
					? 'fixed inset-0 z-50 bg-black/50 lg:static lg:bg-transparent'
					: ''
			}
        `}
				>
					<div
						className={`
            ${
				showFilters
					? 'fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-background border-l shadow-lg lg:static lg:w-full lg:max-w-none lg:bg-transparent lg:border-0 lg:shadow-none'
					: ''
			}
            overflow-y-auto
          `}
					>
						{showFilters && (
							<div className='lg:hidden p-4 border-b'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => setShowFilters(false)}
									className='mb-2'
								>
									✕ {t('close')}
								</Button>
							</div>
						)}
						<div className='p-4 lg:p-0'>
							<ProductFilters
								categories={categories.map((cat: string) => ({
									id: cat as ProductCategory,
									name: cat,
									count: allProducts.filter(
										(p: Product) => p.category === cat
									).length,
								}))}
								selectedCategory={selectedCategory}
								onCategoryChange={setSelectedCategory}
								priceRange={priceRange}
								onPriceRangeChange={setPriceRange}
							/>
						</div>
					</div>
				</div>

				{/* Products Grid/List */}
				<div className='flex-1 min-w-0'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={`${viewMode}-${selectedCategory}-${sortBy}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className={`
                w-full
                ${
					viewMode === 'grid'
						? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6'
						: 'flex flex-col space-y-4'
				}
              `}
						>
							{uniqueFilteredProducts.map(
								(product: Product, index: number) => (
									<motion.div
										key={`${product.id}-${index}-${product.name}`}
										layout
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.2 }}
										className={`
                    ${viewMode === 'list' ? 'w-full' : ''}
                  `}
									>
										<ProductCard
											product={product}
											viewMode={viewMode}
										/>
									</motion.div>
								)
							)}
						</motion.div>
					</AnimatePresence>

					{uniqueFilteredProducts.length === 0 && (
						<div className='text-center py-12'>
							<div className='text-muted-foreground mb-4'>
								{t('noProducts')}
							</div>
							<Button
								variant='outline'
								onClick={handleClearFilters}
							>
								{t('clearFilters')}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
