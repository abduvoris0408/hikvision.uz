import { ContactSection } from '@/components/sections/contact-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProductShowcase } from '@/components/sections/product-showcase'
import {
	HeroSkeleton,
	ProductCardSkeleton,
} from '@/components/ui/loading-skeleton'
import { Suspense } from 'react'

export default function HomePage() {
	return (
		<div className='space-y-0'>
			<Suspense fallback={<HeroSkeleton />}>
				<HeroSection />
			</Suspense>

			<FeaturesSection />

			<Suspense
				fallback={
					<div className='container mx-auto px-4 py-16'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{Array.from({ length: 8 }).map((_, i) => (
								<ProductCardSkeleton key={i} />
							))}
						</div>
					</div>
				}
			>
				<ProductShowcase />
			</Suspense>

			<ContactSection />
		</div>
	)
}
