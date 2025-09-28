'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ReviewsComponent from '@/components/ui/reviews'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/context/CartContext' // CartContext qo'shildi
import { Product } from '@/types/product'

import {
	Award,
	ChevronRight as BreadcrumbArrow,
	Check,
	ChevronLeft,
	ChevronRight,
	Heart,
	Home,
	Phone,
	Share2,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ProductDetailProps {
	product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isLiked, setIsLiked] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const [productData, setProductData] = useState(product)

	// CartContext dan funksiyalarni olish
	const { cart, addToCart, cartCount } = useCart()

	// Mahsulotning savatda borligini tekshirish
	const isInCart = cart.some(
		item => String(item.id) === String(productData.id)
	)

	// Product ma'lumotlarini yangilash uchun
	const fetchProduct = async () => {
		try {
			const response = await fetch(
				`https://hikvision-back.khayitovdev.uz/api/products/${product.id}/`
			)
			if (response.ok) {
				const updatedProduct = await response.json()
				console.log('API Response:', updatedProduct)
				setProductData(updatedProduct)
			}
		} catch (error) {
			console.error('Product yangilanmadi:', error)
		}
	}

	// Component mount bo'lganda product ma'lumotlarini yuklash
	useEffect(() => {
		fetchProduct()
	}, [product.id])

	// Debug uchun productData ni kuzatish
	useEffect(() => {
		console.log('ProductData updated:', productData)
		console.log('in_stock value:', productData.in_stock)
		console.log('Cart count:', cartCount)
		console.log('Is in cart:', isInCart)
	}, [productData, cartCount, isInCart])

	// Reviews dan o'rtacha rating hisoblash
	const calculateAverageRating = (reviews: any[]) => {
		if (!reviews || reviews.length === 0) return 0
		const totalRating = reviews.reduce(
			(sum, review) => sum + (review.rating || 0),
			0
		)
		return Math.round((totalRating / reviews.length) * 10) / 10
	}

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

	const images =
		productData.images && productData.images.length > 0
			? productData.images
			: [productData.image || '/hikvision-camera.jpg']

	const handleToggleFavorite = () => {
		setIsLiked(!isLiked)
		if (!isLiked) {
			toast.success("Mahsulot sevimlilarga qo'shildi!", {
				description: productData.name,
				duration: 3000,
			})
		} else {
			toast.info('Mahsulot sevimlilardan olib tashlandi', {
				description: productData.name,
				duration: 3000,
			})
		}
	}

	const handleShare = async () => {
		try {
			const url = window.location.href
			await navigator.clipboard.writeText(url)
			toast.success('Havola nusxalandi!', {
				description: 'Mahsulot havolasi clipboardga nusxalandi',
				duration: 3000,
			})
		} catch (err) {
			const textArea = document.createElement('textarea')
			textArea.value = window.location.href
			document.body.appendChild(textArea)
			textArea.select()
			document.execCommand('copy')
			document.body.removeChild(textArea)

			toast.success('Havola nusxalandi!', {
				description: 'Mahsulot havolasi clipboardga nusxalandi',
				duration: 3000,
			})
		}
	}

	// CartContext ishlatgan holda savatga qo'shish
	const handleAddToCart = () => {
		try {
			// CartContext orqali qo'shish
			addToCart({
				id: productData.id,
				quantity: quantity,
			})

			toast.success("Mahsulot savatga qo'shildi!", {
				description: `${productData.name} - ${quantity} dona`,
				duration: 3000,
			})

			// Quantity ni reset qilish
			setQuantity(1)
		} catch (error) {
			console.error('Error adding to cart:', error)
			toast.error('Xatolik yuz berdi!', {
				description: "Mahsulotni savatga qo'shishda xatolik yuz berdi",
				duration: 3000,
			})
		}
	}

	const handleGoToCart = () => {
		window.location.href = '/cart'
	}

	return (
		<div className='space-y-8'>
			<nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
				<Link
					href='/'
					className='flex items-center hover:text-foreground transition-colors'
				>
					<Home className='h-4 w-4 mr-1' />
					Bosh sahifa
				</Link>
				<BreadcrumbArrow className='h-4 w-4' />
				<Link
					href='/products'
					className='hover:text-foreground transition-colors'
				>
					Mahsulotlar
				</Link>
				<BreadcrumbArrow className='h-4 w-4' />
				<span className='text-foreground'>{productData.name}</span>
			</nav>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
				{/* Product Images */}
				<div className='space-y-4'>
					<div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
						<Image
							src={
								images[selectedImageIndex] ||
								'/placeholder.svg?height=400&width=400&query=hikvision security camera'
							}
							alt={productData.name}
							fill
							className='object-cover'
							priority
						/>

						<div className='absolute top-4 left-4 flex flex-col gap-2'>
							{productData.isNew && (
								<Badge className='bg-green-500 hover:bg-green-600 text-white'>
									YANGI
								</Badge>
							)}
							{productData.isBestSeller && (
								<Badge className='bg-red-500 hover:bg-red-600 text-white'>
									TOP
								</Badge>
							)}
						</div>

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

					{images.length > 1 && (
						<div className='flex gap-2 overflow-x-auto'>
							{images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImageIndex(index)}
									className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
										selectedImageIndex === index
											? 'border-primary'
											: 'border-transparent hover:border-border'
									}`}
								>
									<Image
										src={
											image ||
											'/placeholder.svg?height=80&width=80&query=camera thumbnail'
										}
										alt={`${productData.name} ${index + 1}`}
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
							{productData.name}
						</h1>
						<p className='text-muted-foreground'>
							{productData.description ||
								productData.shortDescription}
						</p>
					</div>

					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<div className='flex'>
								{renderStars(
									calculateAverageRating(
										productData.reviews || []
									)
								)}
							</div>
							<span className='text-sm text-muted-foreground'>
								{calculateAverageRating(
									productData.reviews || []
								).toFixed(1)}
								({(productData.reviews || []).length}{' '}
								fikr-mulohaza)
							</span>
						</div>
						<Badge
							variant={
								productData.in_stock ? 'default' : 'secondary'
							}
						>
							{productData.in_stock ? 'Mavjud' : 'Tugagan'}
						</Badge>
					</div>

					<div className='space-y-2'>
						<div className='text-3xl font-bold text-red-600'>
							{formatPrice(productData.price)}
						</div>
						{productData.originalPrice && (
							<div className='text-lg text-muted-foreground line-through'>
								{formatPrice(productData.originalPrice)}
							</div>
						)}
					</div>

					<div className='space-y-3'>
						<h3 className='font-semibold'>Asosiy xususiyatlar:</h3>
						<ul className='space-y-2 text-sm'>
							<li className='flex items-center gap-2'>
								<Check className='w-4 h-4 text-green-500' />
								4K Ultra HD sifat
							</li>
							<li className='flex items-center gap-2'>
								<Check className='w-4 h-4 text-green-500' />
								Tungi ko'rish funksiyasi
							</li>
							<li className='flex items-center gap-2'>
								<Check className='w-4 h-4 text-green-500' />
								IP67 himoya darajasi
							</li>
							<li className='flex items-center gap-2'>
								<Check className='w-4 h-4 text-green-500' />2
								yil kafolat
							</li>
						</ul>
					</div>

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
									disabled={!productData.in_stock}
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
									disabled={!productData.in_stock}
								>
									+
								</Button>
							</div>
						</div>

						<div className='flex gap-3'>
							{isInCart ? (
								<Button
									className='flex-1'
									size='lg'
									onClick={handleGoToCart}
									variant='outline'
								>
									<ShoppingCart className='h-5 w-5 mr-2' />
									Savatga o'tish ({cartCount})
								</Button>
							) : (
								<Button
									className='flex-1'
									size='lg'
									onClick={handleAddToCart}
									disabled={!productData.in_stock}
								>
									<ShoppingCart className='h-5 w-5 mr-2' />
									Savatga qo'shish
								</Button>
							)}
							<Button
								variant='outline'
								size='lg'
								onClick={handleToggleFavorite}
							>
								<Heart
									className={`h-5 w-5 ${
										isLiked
											? 'fill-red-500 text-red-500'
											: ''
									}`}
								/>
							</Button>
							<Button
								variant='outline'
								size='lg'
								onClick={handleShare}
							>
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

					<div className='grid grid-cols-3 gap-4 pt-6 border-t'>
						<div className='text-center space-y-2'>
							<Truck className='h-8 w-8 mx-auto text-primary' />
							<div className='text-sm font-medium'>
								Tez yetkazib berish
							</div>
							<div className='text-xs text-muted-foreground'>
								1-3 kun ichida
							</div>
						</div>
						<div className='text-center space-y-2'>
							<Shield className='h-8 w-8 mx-auto text-primary' />
							<div className='text-sm font-medium'>
								2 yil kafolat
							</div>
							<div className='text-xs text-muted-foreground'>
								Rasmiy kafolat
							</div>
						</div>
						<div className='text-center space-y-2'>
							<Award className='h-8 w-8 mx-auto text-primary' />
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

			<Card>
				<CardContent className='p-6'>
					<Tabs defaultValue='description' className='w-full'>
						<TabsList className='grid w-full grid-cols-3'>
							<TabsTrigger value='description'>
								Tavsif
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
								{productData.fullDescription ||
									productData.description ||
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

						<TabsContent value='reviews' className='mt-6'>
							<ReviewsComponent
								productId={Number(productData.id)}
								reviews={productData.reviews || []}
								onReviewAdded={fetchProduct}
							/>
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
		</div>
	)
}
