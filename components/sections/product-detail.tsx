'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Product } from '@/lib/data/products'
import {
	Award,
	ChevronLeft,
	ChevronRight,
	Heart,
	Phone,
	Share2,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { OrderModal } from '../ui/OrderModal'

interface ProductDetailProps {
	product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
	const t = useTranslations('product')
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isLiked, setIsLiked] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false) // Modal holati

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`h-5 w-5 ${
					i < Math.floor(rating)
						? 'fill-yellow-400 text-yellow-400'
						: 'text-gray-300'
				}`}
			/>
		))
	}

	const images = product.images || [product.image || '/placeholder.svg']

	// Savatga qo'shish tugmasi bosilganda
	const handleAddToCart = () => {
		setIsOrderModalOpen(true)
	}

	return (
		<div className='space-y-8'>
			{/* Breadcrumb */}
			<nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
				<span>Bosh sahifa</span>
				<span>/</span>
				<span>Mahsulotlar</span>
				<span>/</span>
				<span className='text-foreground'>{product.name}</span>
			</nav>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
				{/* Product Images */}
				<div className='space-y-4'>
					{/* Main Image */}
					<div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
						<Image
							src={
								images[selectedImageIndex] || '/placeholder.svg'
							}
							alt={product.name}
							fill
							className='object-cover'
							priority
						/>

						{/* Badges */}
						<div className='absolute top-4 left-4 flex flex-col gap-2'>
							{product.isNew && (
								<Badge className='bg-green-500 hover:bg-green-600 text-white'>
									YANGI
								</Badge>
							)}
							{product.isBestSeller && (
								<Badge className='bg-red-500 hover:bg-red-600 text-white'>
									YANGI
								</Badge>
							)}
						</div>

						{/* Navigation Arrows */}
						{images.length > 1 && (
							<>
								<Button
									variant='ghost'
									size='icon'
									className='absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90'
									onClick={() =>
										setSelectedImageIndex(prev =>
											prev === 0
												? images.length - 1
												: prev - 1
										)
									}
								>
									<ChevronLeft className='h-4 w-4' />
								</Button>
								<Button
									variant='ghost'
									size='icon'
									className='absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90'
									onClick={() =>
										setSelectedImageIndex(prev =>
											prev === images.length - 1
												? 0
												: prev + 1
										)
									}
								>
									<ChevronRight className='h-4 w-4' />
								</Button>
							</>
						)}
					</div>

					{/* Thumbnail Images */}
					{images.length > 1 && (
						<div className='flex gap-2 overflow-x-auto'>
							{images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImageIndex(index)}
									className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
										selectedImageIndex === index
											? 'border-secondary'
											: 'border-transparent'
									}`}
								>
									<Image
										src={image || '/placeholder.svg'}
										alt={`${product.name} ${index + 1}`}
										fill
										className='object-cover'
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className='space-y-6'>
					<div>
						<h1 className='text-3xl font-bold text-foreground mb-2'>
							{product.name}
						</h1>
						<p className='text-muted-foreground'>
							{product.description}
						</p>
					</div>

					{/* Rating */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<div className='flex'>
								{renderStars(product.rating)}
							</div>
							<span className='text-sm text-muted-foreground'>
								({product.reviewCount} fikr-mulohaza)
							</span>
						</div>
						<Badge variant='outline'>Mavjud</Badge>
					</div>

					{/* Price */}
					<div className='space-y-2'>
						<div className='text-3xl font-bold text-red-600'>
							{formatPrice(product.price)}
						</div>
						{product.originalPrice && (
							<div className='text-lg text-muted-foreground line-through'>
								{formatPrice(product.originalPrice)}
							</div>
						)}
					</div>

					{/* Key Features */}
					<div className='space-y-3'>
						<h3 className='font-semibold'>Asosiy xususiyatlar:</h3>
						<ul className='space-y-2 text-sm'>
							<li className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-secondary rounded-full' />
								4K Ultra HD sifat
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-secondary rounded-full' />
								Tungi ko'rish funksiyasi
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-secondary rounded-full' />
								IP67 himoya darajasi
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-secondary rounded-full' />
								2 yil kafolat
							</li>
						</ul>
					</div>

					{/* Quantity and Actions */}
					<div className='space-y-4'>
						<div className='flex items-center gap-4'>
							<label className='text-sm font-medium'>
								Miqdor:
							</label>
							<div className='flex items-center border rounded-lg'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										setQuantity(Math.max(1, quantity - 1))
									}
									className='px-3'
								>
									-
								</Button>
								<span className='px-4 py-2 min-w-[3rem] text-center'>
									{quantity}
								</span>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => setQuantity(quantity + 1)}
									className='px-3'
								>
									+
								</Button>
							</div>
						</div>

						<div className='flex gap-3'>
							<Button
								className='flex-1'
								size='lg'
								onClick={handleAddToCart} // Modal ochish funksiyasi
							>
								<ShoppingCart className='h-5 w-5 mr-2' />
								Savatga qo'shish
							</Button>
							<Button
								variant='outline'
								size='lg'
								onClick={() => setIsLiked(!isLiked)}
							>
								<Heart
									className={`h-5 w-5 ${
										isLiked
											? 'fill-red-500 text-red-500'
											: ''
									}`}
								/>
							</Button>
							<Button variant='outline' size='lg'>
								<Share2 className='h-5 w-5' />
							</Button>
						</div>

						<Button
							variant='outline'
							className='w-full bg-transparent'
							size='lg'
						>
							<Phone className='h-5 w-5 mr-2' />
							Qo'ng'iroq qiling: +998952522222
						</Button>
					</div>

					{/* Trust Badges */}
					<div className='grid grid-cols-3 gap-4 pt-6 border-t'>
						<div className='text-center space-y-2'>
							<Truck className='h-8 w-8 mx-auto text-secondary' />
							<div className='text-sm font-medium'>
								Tez yetkazib berish
							</div>
							<div className='text-xs text-muted-foreground'>
								1-3 kun ichida
							</div>
						</div>
						<div className='text-center space-y-2'>
							<Shield className='h-8 w-8 mx-auto text-secondary' />
							<div className='text-sm font-medium'>
								2 yil kafolat
							</div>
							<div className='text-xs text-muted-foreground'>
								Rasmiy kafolat
							</div>
						</div>
						<div className='text-center space-y-2'>
							<Award className='h-8 w-8 mx-auto text-secondary' />
							<div className='text-sm font-medium'>
								Sifat kafolati
							</div>
							<div className='text-xs text-muted-foreground'>
								100% original
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Product Details Tabs */}
			<Card>
				<CardContent className='p-6'>
					<Tabs defaultValue='description' className='w-full'>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger value='description'>
								Tavsif
							</TabsTrigger>
							<TabsTrigger value='specifications'>
								Xususiyatlar
							</TabsTrigger>
							<TabsTrigger value='reviews'>Sharhlar</TabsTrigger>
							<TabsTrigger value='delivery'>
								Yetkazib berish
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value='description'
							className='mt-6 space-y-4'
						>
							<h3 className='text-lg font-semibold'>
								Mahsulot haqida
							</h3>
							<p className='text-muted-foreground leading-relaxed'>
								{product.description ||
									"Bu mahsulot yuqori sifatli xavfsizlik kamerasi bo'lib, zamonaviy texnologiyalar bilan jihozlangan. 4K Ultra HD sifat, tungi ko'rish funksiyasi va IP67 himoya darajasi bilan jihozlangan."}
							</p>
							<div className='space-y-2'>
								<h4 className='font-medium'>Afzalliklari:</h4>
								<ul className='list-disc list-inside space-y-1 text-sm text-muted-foreground'>
									<li>Yuqori sifatli tasvir va video</li>
									<li>Oson o'rnatish va sozlash</li>
									<li>Masofadan boshqarish imkoniyati</li>
									<li>Ishonchli va uzoq muddatli ishlash</li>
								</ul>
							</div>
						</TabsContent>

						<TabsContent value='specifications' className='mt-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-4'>
									<h3 className='text-lg font-semibold'>
										Texnik xususiyatlar
									</h3>
									<div className='space-y-3'>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Sensor turi:
											</span>
											<span>CMOS</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Ruxsat:
											</span>
											<span>4K (3840×2160)</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Ob'ektiv:
											</span>
											<span>2.8-12mm</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Tungi ko'rish:
											</span>
											<span>30m gacha</span>
										</div>
									</div>
								</div>
								<div className='space-y-4'>
									<h3 className='text-lg font-semibold'>
										Qo'shimcha ma'lumotlar
									</h3>
									<div className='space-y-3'>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Himoya darajasi:
											</span>
											<span>IP67</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Quvvat:
											</span>
											<span>12V DC</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												O'lcham:
											</span>
											<span>70×70×150mm</span>
										</div>
										<div className='flex justify-between py-2 border-b'>
											<span className='text-muted-foreground'>
												Og'irlik:
											</span>
											<span>450g</span>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value='reviews' className='mt-6 space-y-6'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-semibold'>
									Mijozlar sharhlari
								</h3>
								<Button variant='outline'>Sharh yozish</Button>
							</div>

							<div className='space-y-4'>
								{/* Sample Reviews */}
								<Card>
									<CardContent className='p-4'>
										<div className='flex items-start gap-4'>
											<div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
												<span className='text-sm font-medium'>
													A
												</span>
											</div>
											<div className='flex-1 space-y-2'>
												<div className='flex items-center gap-2'>
													<span className='font-medium'>
														Aziz
													</span>
													<div className='flex'>
														{renderStars(5)}
													</div>
												</div>
												<p className='text-sm text-muted-foreground'>
													Juda yaxshi kamera, sifati
													zo'r. Tez yetkazib berishdi
													va o'rnatishda yordam
													berishdi.
												</p>
												<span className='text-xs text-muted-foreground'>
													2 kun oldin
												</span>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className='p-4'>
										<div className='flex items-start gap-4'>
											<div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
												<span className='text-sm font-medium'>
													M
												</span>
											</div>
											<div className='flex-1 space-y-2'>
												<div className='flex items-center gap-2'>
													<span className='font-medium'>
														Murod
													</span>
													<div className='flex'>
														{renderStars(4)}
													</div>
												</div>
												<p className='text-sm text-muted-foreground'>
													Narxi mos, sifati yaxshi.
													Tungi ko'rish funksiyasi
													juda yaxshi ishlaydi.
												</p>
												<span className='text-xs text-muted-foreground'>
													1 hafta oldin
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						<TabsContent
							value='delivery'
							className='mt-6 space-y-4'
						>
							<h3 className='text-lg font-semibold'>
								Yetkazib berish va to'lov
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-4'>
									<h4 className='font-medium'>
										Yetkazib berish
									</h4>
									<ul className='space-y-2 text-sm text-muted-foreground'>
										<li>• Toshkent bo'ylab - 1-2 kun</li>
										<li>• Viloyatlarga - 2-5 kun</li>
										<li>
											• 500,000 so'mdan yuqori - bepul
										</li>
										<li>• Kuryer orqali yetkazib berish</li>
									</ul>
								</div>
								<div className='space-y-4'>
									<h4 className='font-medium'>
										To'lov usullari
									</h4>
									<ul className='space-y-2 text-sm text-muted-foreground'>
										<li>• Naqd pul</li>
										<li>• Bank kartalari</li>
										<li>• Online to'lov</li>
										<li>• Muddatli to'lov</li>
									</ul>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			{/* Order Modal */}
			<OrderModal
				isOpen={isOrderModalOpen}
				onClose={() => setIsOrderModalOpen(false)}
				product={product}
				initialQuantity={quantity}
			/>
		</div>
	)
}
