'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import type { ProductCategory } from '@/lib/data/products'
import { useTranslations } from 'next-intl'

interface ProductFiltersProps {
	categories: { id: ProductCategory; name: string; count: number }[]
	selectedCategory: ProductCategory | 'all'
	onCategoryChange: (category: ProductCategory | 'all') => void
	priceRange: [number, number]
	onPriceRangeChange: (range: [number, number]) => void
}

export function ProductFilters({
	categories,
	selectedCategory,
	onCategoryChange,
	priceRange,
	onPriceRangeChange,
}: ProductFiltersProps) {
	const t = useTranslations('products')

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	return (
		<div className='space-y-6'>
			{/* Categories */}
			<Card>
				<CardContent className='space-y-2'>
					<Button
						variant={
							selectedCategory === 'all' ? 'default' : 'ghost'
						}
						className='w-full justify-start'
						onClick={() => onCategoryChange('all')}
					>
						{t('allCategories')}
					</Button>
					{categories.map(category => (
						<Button
							key={category.id}
							variant={
								selectedCategory === category.id
									? 'default'
									: 'ghost'
							}
							className='w-full justify-between'
							onClick={() => onCategoryChange(category.id)}
						>
							<span>{category.name}</span>
							<Badge variant='secondary' className='ml-2'>
								{category.count}
							</Badge>
						</Button>
					))}
				</CardContent>
			</Card>

			{/* Price Range */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>{t('priceRange')}</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Slider
						value={priceRange}
						onValueChange={value =>
							onPriceRangeChange(value as [number, number])
						}
						max={5000000}
						min={0}
						step={50000}
						className='w-full'
					/>
					<div className='flex justify-between text-sm text-muted-foreground'>
						<span>{formatPrice(priceRange[0])}</span>
						<span>{formatPrice(priceRange[1])}</span>
					</div>
				</CardContent>
			</Card>

			{/* Features Filter */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg'>{t('features')}</CardTitle>
				</CardHeader>
				<CardContent className='space-y-2'>
					<Button variant='ghost' className='w-full justify-start'>
						4K HDMI kabel
					</Button>
					<Button variant='ghost' className='w-full justify-start'>
						IP kamera
					</Button>
					<Button variant='ghost' className='w-full justify-start'>
						PTZ kamera
					</Button>
					<Button variant='ghost' className='w-full justify-start'>
						Tungi ko'rish
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
