'use client'

import { ProductCatalog } from '@/components/sections/product-catalog'
import { ProductCatalogSkeleton } from '@/components/ui/product-catalog-skeleton'
import { Suspense } from 'react'

export default function ProductsPage() {
	return (
		<div className='min-h-screen bg-background'>
			{/* <div className='bg-gradient-to-r from-secondary/10 to-secondary/5 py-12'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl'>
						<h1 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
							Hikvision Mahsulotlari
						</h1>
						<p className='text-lg text-muted-foreground'>
							Eng so'nggi Hikvision xavfsizlik tizimlari va
							kameralarini kashf eting
						</p>
					</div>
				</div>
			</div> */}

			<div className='container mx-auto px-4 py-8'>
				<Suspense fallback={<ProductCatalogSkeleton />}>
					<ProductCatalog />
				</Suspense>
			</div>
		</div>
	)
}
