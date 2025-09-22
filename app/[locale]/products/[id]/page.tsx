// app/[locale]/products/[id]/page.tsx
import { ProductDetail } from '@/components/sections/product-detail'
import { RelatedProducts } from '@/components/sections/related-products'
import { ProductDetailSkeleton } from '@/components/ui/product-detail-skeleton'
import { products } from '@/lib/data/products'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// RO'YXAT: loyihangiz qo'llab-quvvatlaydigan locale'larni shu yerda ro'yxatlang
const SUPPORTED_LOCALES = ['en', 'uz', 'ru']

interface ProductPageProps {
	params: {
		id: string
		locale: string
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	try {
		const { id, locale } = params

		// Agar noma'lum locale kelgan bo'lsa, notFound qaytarish mumkin
		if (!SUPPORTED_LOCALES.includes(locale)) {
			return notFound()
		}

		const product = products.find(p => p.id === id)

		if (!product) {
			return notFound()
		}

		return (
			<div className='min-h-screen bg-background'>
				<div className='container mx-auto px-4 py-8'>
					<Suspense fallback={<ProductDetailSkeleton />}>
						<ProductDetail product={product} />
					</Suspense>

					<div className='mt-16'>
						<RelatedProducts
							currentProductId={product.id}
							category={product.category}
						/>
					</div>
				</div>
			</div>
		)
	} catch (err) {
		// Serverda istisno tushsa, log qilamiz va foydalanuvchiga yengil fallback ko'rsatamiz
		console.error('ProductPage error:', err)
		return (
			<div className='min-h-screen flex items-center justify-center p-8'>
				<div className='max-w-xl text-center'>
					<h1 className='text-2xl font-bold'>Sahifa yuklanmadi</h1>
					<p className='mt-4 text-muted'>
						Sahifani ochishda xatolik yuz berdi. Iltimos, birozdan
						keyin qaytadan urinib ko'ring.
					</p>
				</div>
			</div>
		)
	}
}

/**
 * generateStaticParams — har bir locale × id kombinatsiyasini qaytaradi,
 * shu bilan Next har bir lokalizatsiyalangan yo'l uchun SSG fayllar yaratadi.
 */
export async function generateStaticParams() {
	const params: Array<{ locale: string; id: string }> = []

	for (const locale of SUPPORTED_LOCALES) {
		for (const product of products) {
			params.push({
				locale,
				id: product.id,
			})
		}
	}

	return params
}
