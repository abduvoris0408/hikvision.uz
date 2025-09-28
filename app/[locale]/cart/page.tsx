'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/CartContext'
import { useCheckout } from '@/lib/hooks/usecheckout'

import {
	AlertCircle,
	CheckCircle,
	CreditCard,
	Gift,
	Minus,
	Package,
	Package2,
	Phone,
	Plus,
	ShoppingCart,
	Star,
	Trash2,
	User,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// Types
interface CheckoutFormData {
	firstName: string
	lastName: string
	phoneNumber: string
}

interface CheckoutFormErrors {
	firstName?: string
	lastName?: string
	phoneNumber?: string
	general?: string
}

interface CheckoutPageProps {
	onBack: () => void
	onSuccess: () => void
}

interface CheckoutData {
	full_name: string
	phone_number: string
	items: Array<{
		product_id: number
		quantity: number
	}>
}

// Product ma'lumotlarini API dan olish uchun interface
interface ProductDetails {
	id: string | number
	name: string
	price: number
	image?: string
	description?: string
	shortDescription?: string
	isNew?: boolean
	isBestSeller?: boolean
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
	const [formData, setFormData] = useState<CheckoutFormData>({
		firstName: '',
		lastName: '',
		phoneNumber: '+998 ',
	})
	const [formErrors, setFormErrors] = useState<CheckoutFormErrors>({})
	const [isSuccess, setIsSuccess] = useState(false)
	const [productDetails, setProductDetails] = useState<
		Record<string, ProductDetails>
	>({})
	const [isLoadingProducts, setIsLoadingProducts] = useState(true)
	const [finalOrderData, setFinalOrderData] = useState<{
		items: Array<{ id: string | number; name: string; quantity: number }>
		totalPrice: number
	} | null>(null) // Success holati uchun ma'lumotlarni saqlash

	// CartContext dan ma'lumotlarni olish
	const { cart, removeFromCart, clearCart, cartCount, updateQuantity } =
		useCart()

	// Debug uchun
	useEffect(() => {
		console.log('CheckoutPage - Cart:', cart)
		console.log('CheckoutPage - updateQuantity function:', updateQuantity)
		console.log('CheckoutPage - cartCount:', cartCount)
	}, [cart, updateQuantity, cartCount])

	// Checkout hook
	const { isLoading, error, success, submitOrder, clearError, clearSuccess } =
		useCheckout()

	// Product detallari yuklanishi uchun
	useEffect(() => {
		const loadProductDetails = async () => {
			if (cart.length === 0) {
				setIsLoadingProducts(false)
				return
			}

			setIsLoadingProducts(true)

			try {
				const details: Record<string, ProductDetails> = {}

				// Har bir cart item uchun product ma'lumotlarini yuklash
				await Promise.all(
					cart.map(async item => {
						try {
							const response = await fetch(
								`https://hikvision-back.khayitovdev.uz/api/products/${item.id}/`
							)
							if (response.ok) {
								const product = await response.json()
								details[String(item.id)] = {
									id: item.id,
									name: product.name || `Mahsulot ${item.id}`,
									price: product.price || 0,
									image: product.image || product.images?.[0],
									description: product.description,
									shortDescription: product.shortDescription,
									isNew: product.isNew,
									isBestSeller: product.isBestSeller,
								}
							} else {
								// Agar API dan ma'lumot kelmasa, default qiymatlar
								details[String(item.id)] = {
									id: item.id,
									name: `Mahsulot ${item.id}`,
									price: 0,
									image: undefined,
								}
							}
						} catch (error) {
							console.error(
								`Product ${item.id} ma'lumotlarini yuklashda xatolik:`,
								error
							)
							details[String(item.id)] = {
								id: item.id,
								name: `Mahsulot ${item.id}`,
								price: 0,
								image: undefined,
							}
						}
					})
				)

				setProductDetails(details)
			} catch (error) {
				console.error(
					"Product ma'lumotlarini yuklashda xatolik:",
					error
				)
				toast.error("Mahsulot ma'lumotlarini yuklashda xatolik")
			} finally {
				setIsLoadingProducts(false)
			}
		}

		loadProductDetails()
	}, []) // faqat component mount bo'lganda ishlatish

	// Success holati
	useEffect(() => {
		if (success && !isSuccess) {
			// faqat bir marta ishlatish uchun
			// Success holatidan oldin final ma'lumotlarni saqlash
			const orderData = {
				items: cart.map(item => {
					const product = productDetails[String(item.id)]
					return {
						id: item.id,
						name: product?.name || `Mahsulot ${item.id}`,
						quantity: item.quantity || 1,
					}
				}),
				totalPrice: calculateTotalPrice(),
			}

			console.log('Saving final order data:', orderData) // Debug log
			setFinalOrderData(orderData)
			setIsSuccess(true)

			// Biraz kutib cart ni tozalash
			setTimeout(() => {
				clearCart()
			}, 100)

			setTimeout(() => {
				onSuccess()
			}, 4000)
		}
	}, [success, isSuccess]) // dependency array ni soddalashtirildi

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => {
			const product = productDetails[String(item.id)]
			if (product) {
				return total + product.price * (item.quantity || 1)
			}
			return total
		}, 0)
	}

	const getTotalItems = () => {
		return cart.reduce((total, item) => total + (item.quantity || 1), 0)
	}

	const validateForm = () => {
		const errors: CheckoutFormErrors = {}

		if (!formData.firstName.trim()) {
			errors.firstName = 'Ism kiritish majburiy'
		} else if (formData.firstName.trim().length < 2) {
			errors.firstName = "Ism kamida 2 ta harf bo'lishi kerak"
		}

		if (!formData.lastName.trim()) {
			errors.lastName = 'Familya kiritish majburiy'
		} else if (formData.lastName.trim().length < 2) {
			errors.lastName = "Familya kamida 2 ta harf bo'lishi kerak"
		}

		if (
			!formData.phoneNumber.trim() ||
			formData.phoneNumber.trim() === '+998 '
		) {
			errors.phoneNumber = 'Telefon raqam kiritish majburiy'
		} else if (
			!/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(
				formData.phoneNumber.replace(/\s+/g, ' ')
			)
		) {
			errors.phoneNumber =
				"Telefon raqam noto'g'ri formatda (+998 XX XXX XX XX)"
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleInputChange = (
		field: keyof CheckoutFormData,
		value: string
	) => {
		if (field === 'phoneNumber') {
			let formattedValue = value.replace(/[^\d+\s]/g, '')
			if (!formattedValue.startsWith('+998')) {
				formattedValue =
					'+998 ' + formattedValue.replace(/^\+?998\s?/, '')
			}
			if (formattedValue.length > 17) return
			setFormData(prev => ({ ...prev, [field]: formattedValue }))
		} else {
			setFormData(prev => ({ ...prev, [field]: value }))
		}

		if (formErrors[field]) {
			setFormErrors(prev => ({ ...prev, [field]: '' }))
		}

		if (error) {
			clearError()
		}
	}

	const handleQuantityChange = (
		itemId: string | number,
		increment: boolean
	) => {
		const currentItem = cart.find(
			item => String(item.id) === String(itemId)
		)
		if (!currentItem) return

		const newQuantity = increment
			? (currentItem.quantity || 1) + 1
			: Math.max(1, (currentItem.quantity || 1) - 1)

		updateQuantity(itemId, newQuantity)

		toast.success(
			increment
				? 'Mahsulot miqdori oshirildi'
				: 'Mahsulot miqdori kamaytirildi',
			{ duration: 2000 }
		)
	}

	const handleRemoveItem = (itemId: string | number) => {
		const product = productDetails[String(itemId)]
		removeFromCart(itemId)
		toast.success('Mahsulot savatdan olib tashlandi', {
			description: product?.name || `Mahsulot ${itemId}`,
			duration: 3000,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return
		if (cart.length === 0) {
			setFormErrors({ general: "Savatda mahsulotlar yo'q" })
			return
		}

		const checkoutData: CheckoutData = {
			full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
			phone_number: formData.phoneNumber.replace(/\s+/g, ''),
			items: cart.map(item => ({
				product_id:
					typeof item.id === 'string' ? parseInt(item.id) : item.id,
				quantity: item.quantity || 1,
			})),
		}

		console.log('Submitting order:', checkoutData)
		await submitOrder(checkoutData)
	}

	if (isSuccess) {
		return (
			<div className='min-h-screen flex items-center justify-center p-4'>
				<Card className='max-w-2xl w-full shadow-lg border-0'>
					<CardContent className='text-center py-12'>
						<div className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6'>
							<CheckCircle className='h-12 w-12 text-white' />
						</div>

						<h2 className='text-3xl font-bold text-green-600 mb-4'>
							Buyurtma qabul qilindi!
						</h2>
						<p className='text-gray-600 mb-8 text-lg'>
							Tez orada operatorlarimiz siz bilan bog'lanadi
						</p>

						<div className='bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 text-left'>
							<div className='flex items-center gap-2 mb-4'>
								<Gift className='h-5 w-5 text-green-600' />
								<strong className='text-green-800'>
									Buyurtma ma'lumotlari:
								</strong>
							</div>
							<div className='space-y-2 text-sm text-green-700'>
								<div className='flex items-center gap-2'>
									<User className='h-4 w-4' />
									<span>
										{formData.firstName} {formData.lastName}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Phone className='h-4 w-4' />
									<span>{formData.phoneNumber}</span>
								</div>
								<div className='flex items-center gap-2 mt-3'>
									<Package className='h-4 w-4' />
									<span className='font-medium'>
										Mahsulotlar (
										{finalOrderData?.items.reduce(
											(sum, item) => sum + item.quantity,
											0
										) || 0}{' '}
										ta):
									</span>
								</div>
								{finalOrderData?.items.map(item => (
									<div
										key={item.id}
										className='ml-6 flex justify-between'
									>
										<span>• {item.name}</span>
										<span>{item.quantity} dona</span>
									</div>
								))}
								<Separator className='my-3' />
								<div className='flex items-center justify-between font-bold text-green-800 text-lg'>
									<div className='flex items-center gap-2'>
										<CreditCard className='h-4 w-4' />
										<span>Jami summa:</span>
									</div>
									<span>
										{formatPrice(
											finalOrderData?.totalPrice || 0
										)}
									</span>
								</div>
							</div>
						</div>

						<div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
							<p className='text-sm text-blue-800'>
								💡 <strong>Eslatma:</strong> Buyurtmangiz 1-2
								soat ichida qayta ishlanadi va sizga qo'ng'iroq
								qilinadi.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isLoadingProducts) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
					<p className='text-gray-600'>Savat yuklanmoqda...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='flex items-center gap-4 mb-8'>
					<div className='flex-1'>
						<h1 className='text-3xl font-bold text-gray-900'>
							Buyurtmani rasmiylashtirish
						</h1>
					</div>
					<div className='flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full'>
						<ShoppingCart className='h-4 w-4 text-blue-600' />
						<span className='font-medium text-blue-800'>
							{cartCount} ta mahsulot
						</span>
					</div>
				</div>

				{/* Error Alert */}
				{error && (
					<Alert className='mb-6 border-red-200 bg-red-50'>
						<AlertCircle className='h-4 w-4 text-red-600' />
						<AlertDescription className='text-red-800'>
							<strong>Xatolik:</strong> {error}
						</AlertDescription>
					</Alert>
				)}

				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
					{/* Cart Items */}
				 <div className='xl:col-span-2 space-y-6'>
      <Card className='bg-white/80 backdrop-blur-sm'>
        <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Package className='h-5 w-5' aria-hidden />
              <span className='text-lg font-semibold'>Buyurtma mahsulotlari</span>
            </div>
            <Badge className='bg-white/20 text-white border-white/30'>{cart.length} mahsulot</Badge>
          </div>
        </div>

        <CardContent className='p-4 sm:p-6'>
          {cart.length === 0 ? (
            <div className='text-center py-12'>
              <ShoppingCart className='h-16 w-16 text-gray-300 mx-auto mb-4' aria-hidden />
              <p className='text-xl text-gray-500 mb-2'>Savatda mahsulotlar yo'q</p>
              <p className='text-gray-400'>Avval mahsulot qo'shing</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {cart.map((item) => {
                const key = String(item.id)
                const product = productDetails[key]
                const qty = item.quantity ?? 1

                return (
                  <article
                    key={key}
                    className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white group'
                    aria-labelledby={`product-${key}-name`}
                  >
                    {/* Image */}
                    <div className='relative w-full sm:w-24 md:w-28 h-40 sm:h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50'>
                      <Image
                        src={product?.image ?? '/placeholder.svg'}
                        alt={product?.name ?? `Mahsulot ${key}`}
                        fill
                        className='object-cover'
                        sizes='(max-width: 640px) 100vw, 120px'
                      />
                      {product?.isNew && (
                        <span className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold'>
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className='flex-1 min-w-0'>
                      <h3 id={`product-${key}-name`} className='font-bold text-gray-900 truncate text-base sm:text-lg'>
                        {product?.name ?? `Mahsulot ${key}`}
                      </h3>

                      <div className='flex items-center gap-2 mt-1 flex-wrap'>
                        <span className='text-lg font-semibold text-blue-600'>
                          {product?.price != null ? formatPrice(product.price!) : "Narx noma'lum"}
                        </span>

                        {product?.isNew && (
                          <Badge className='bg-green-100 text-green-800'>
                            <Star className='h-3 w-3 mr-1' /> YANGI
                          </Badge>
                        )}

                        {/* Short description placeholder could go here */}
                      </div>
                    </div>

                    {/* Controls (quantity, item total, remove) */}
                    <div className='mt-3 sm:mt-0 flex items-center gap-3 justify-between w-full sm:w-auto'>
                      {/* Quantity controls */}
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-2 bg-gray-50 rounded-lg p-1'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                            onClick={() => handleQuantityChange(Number(item.id), false)}
                            disabled={isLoading || qty <= 1}
                            aria-label={`Kamaytir ${product?.name ?? key}`}
                          >
                            <Minus className='h-3 w-3' />
                          </Button>

                          <span className='px-3 py-1 min-w-[2.25rem] text-center font-semibold text-gray-900'>
                            {qty}
                          </span>

                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                            onClick={() => handleQuantityChange(Number(item.id), true)}
                            disabled={isLoading}
                            aria-label={`Ko'paytir ${product?.name ?? key}`}
                          >
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div className='font-bold text-gray-900 min-w-[88px] text-right'>
                        {product?.price != null ? formatPrice(product.price! * qty) : ''}
                      </div>

                      {/* Remove button */}
                      <div className='flex items-center'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleRemoveItem(Number(item.id))}
                          disabled={isLoading}
                          className='text-red-500 hover:text-red-700 hover:bg-red-50 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity'
                          aria-label={`O'chirish ${product?.name ?? key}`}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>

					{/* Form and Summary */}
					<div className='space-y-6'>
						{/* Customer Form */}
						<Card className='bg-white/80 backdrop-blur-sm'>
							<div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-4'>
								<div className='flex items-center justify-center gap-2'>
									<User className='h-5 w-5' />
									<span className='text-lg font-semibold'>
										Shaxsiy ma'lumotlar
									</span>
								</div>
							</div>
							<CardContent className='p-6'>
								<form
									onSubmit={handleSubmit}
									className='space-y-4'
								>
									<div className='space-y-2'>
										<Label
											htmlFor='firstName'
											className='text-sm font-semibold text-gray-700'
										>
											Ism{' '}
											<span className='text-red-500'>
												*
											</span>
										</Label>
										<Input
											id='firstName'
											type='text'
											placeholder='Ismingizni kiriting'
											value={formData.firstName}
											onChange={e =>
												handleInputChange(
													'firstName',
													e.target.value
												)
											}
											className={`h-12 ${
												formErrors.firstName
													? 'border-red-300 focus:border-red-500'
													: 'focus:border-blue-500'
											}`}
											disabled={isLoading}
										/>
										{formErrors.firstName && (
											<p className='text-sm text-red-600'>
												{formErrors.firstName}
											</p>
										)}
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='lastName'
											className='text-sm font-semibold text-gray-700'
										>
											Familya{' '}
											<span className='text-red-500'>
												*
											</span>
										</Label>
										<Input
											id='lastName'
											type='text'
											placeholder='Familyangizni kiriting'
											value={formData.lastName}
											onChange={e =>
												handleInputChange(
													'lastName',
													e.target.value
												)
											}
											className={`h-12 ${
												formErrors.lastName
													? 'border-red-300 focus:border-red-500'
													: 'focus:border-blue-500'
											}`}
											disabled={isLoading}
										/>
										{formErrors.lastName && (
											<p className='text-sm text-red-600'>
												{formErrors.lastName}
											</p>
										)}
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='phoneNumber'
											className='text-sm font-semibold text-gray-700'
										>
											Telefon raqami{' '}
											<span className='text-red-500'>
												*
											</span>
										</Label>
										<div className='relative'>
											<Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
											<Input
												id='phoneNumber'
												type='tel'
												placeholder='+998 90 123 45 67'
												value={formData.phoneNumber}
												onChange={e =>
													handleInputChange(
														'phoneNumber',
														e.target.value
													)
												}
												className={`h-12 pl-10 ${
													formErrors.phoneNumber
														? 'border-red-300 focus:border-red-500'
														: 'focus:border-blue-500'
												}`}
												disabled={isLoading}
											/>
										</div>
										{formErrors.phoneNumber && (
											<p className='text-sm text-red-600'>
												{formErrors.phoneNumber}
											</p>
										)}
									</div>
								</form>
							</CardContent>
						</Card>

						{/* Order Summary */}
						{cart.length > 0 && (
							<Card className='bg-white sticky top-6'>
								<div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-4'>
									<div className='flex items-center justify-center gap-2'>
										<Package2 className='h-5 w-5' />
										<span className='text-lg font-semibold'>
											Buyurtma xulosasi
										</span>
									</div>
								</div>
								<CardContent className='p-6'>
									<div className='space-y-4'>
										<div className='flex justify-between items-center py-2'>
											<span className='text-gray-600'>
												Mahsulotlar soni:
											</span>
											<span className='font-semibold'>
												{getTotalItems()} ta
											</span>
										</div>
										<div className='flex justify-between items-center py-2'>
											<span className='text-gray-600'>
												Turlar soni:
											</span>
											<span className='font-semibold'>
												{cart.length} tur
											</span>
										</div>
										<Separator />
										<div className='flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4'>
											<span className='text-xl font-bold text-gray-900'>
												Jami summa:
											</span>
											<span className='text-2xl font-bold text-green-600'>
												{formatPrice(
													calculateTotalPrice()
												)}
											</span>
										</div>

										<Button
											type='submit'
											onClick={handleSubmit}
											className='w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
											disabled={
												isLoading || cart.length === 0
											}
										>
											{isLoading ? (
												<>
													<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
													Yuborilmoqda...
												</>
											) : (
												<>
													<CheckCircle className='h-5 w-5 mr-2' />
													Buyurtmani tasdiqlash
												</>
											)}
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
