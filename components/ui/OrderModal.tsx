'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Product } from '@/lib/data/products'
import { CheckCircle, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface OrderModalProps {
	isOpen: boolean
	onClose: () => void
	product: Product
	initialQuantity?: number
}

interface OrderFormData {
	firstName: string
	lastName: string
	phoneNumber: string
	quantity: number
}

export function OrderModal({
	isOpen,
	onClose,
	product,
	initialQuantity = 1,
}: OrderModalProps) {
	const [formData, setFormData] = useState<OrderFormData>({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		quantity: initialQuantity,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	const totalPrice = product.price * formData.quantity

	const handleInputChange = (
		field: keyof OrderFormData,
		value: string | number
	) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleQuantityChange = (increment: boolean) => {
		setFormData(prev => ({
			...prev,
			quantity: increment
				? prev.quantity + 1
				: Math.max(1, prev.quantity - 1),
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Form validatsiyasi
		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.phoneNumber
		) {
			return
		}

		setIsSubmitting(true)

		// API ga jo'natish simulatsiyasi
		try {
			await new Promise(resolve => setTimeout(resolve, 1000))

			// Muvaffaqiyatli yuborildi
			setIsSuccess(true)

			// 2 soniyadan keyin modalda muvaffaqiyat xabarini yashirish
			setTimeout(() => {
				setIsSuccess(false)
				onClose()
				// Formani tozalash
				setFormData({
					firstName: '',
					lastName: '',
					phoneNumber: '',
					quantity: initialQuantity,
				})
			}, 2000)
		} catch (error) {
			console.error('Buyurtma yuborishda xatolik:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleClose = () => {
		if (!isSubmitting) {
			setIsSuccess(false)
			onClose()
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='max-w-[95%] sm:max-w-[400px] md:max-w-[500px] max-h-[90vh] overflow-y-auto'>
				{!isSuccess ? (
					<>
						<DialogHeader>
							<DialogTitle className='text-xl font-bold'>
								Buyurtma berish
							</DialogTitle>
							<DialogDescription>
								Ma'lumotlaringizni kiriting va buyurtmangizni
								tasdiqlang
							</DialogDescription>
						</DialogHeader>

						{/* Mahsulot ma'lumotlari */}
						<Card className='mb-4'>
							<CardContent className='p-4'>
								<div className='flex items-center gap-4'>
									<div className='relative w-20 h-20 rounded-lg overflow-hidden'>
										<Image
											src={
												product.image ||
												'/placeholder.svg'
											}
											alt={product.name}
											fill
											className='object-cover'
										/>
									</div>
									<div className='flex-1'>
										<h3 className='font-semibold text-sm'>
											{product.name}
										</h3>
										<p className='text-sm text-muted-foreground mt-1'>
											{formatPrice(product.price)}
										</p>
										{product.isNew && (
											<Badge className='mt-1 bg-green-500 hover:bg-green-600 text-white text-xs'>
												YANGI
											</Badge>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<form onSubmit={handleSubmit} className='space-y-4'>
							{/* Shaxsiy ma'lumotlar */}
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='firstName'>
										Ism{' '}
										<span className='text-red-500'>*</span>
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
										required
										disabled={isSubmitting}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='lastName'>
										Familya{' '}
										<span className='text-red-500'>*</span>
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
										required
										disabled={isSubmitting}
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='phoneNumber'>
									Telefon raqami{' '}
									<span className='text-red-500'>*</span>
								</Label>
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
									required
									disabled={isSubmitting}
								/>
							</div>

							{/* Miqdor tanlash */}
							<div className='space-y-2'>
								<Label>Miqdor</Label>
								<div className='flex items-center gap-3'>
									<Button
										type='button'
										variant='outline'
										size='icon'
										onClick={() =>
											handleQuantityChange(false)
										}
										disabled={
											formData.quantity <= 1 ||
											isSubmitting
										}
									>
										<Minus className='h-4 w-4' />
									</Button>
									<span className='px-4 py-2 min-w-[3rem] text-center border rounded-md'>
										{formData.quantity}
									</span>
									<Button
										type='button'
										variant='outline'
										size='icon'
										onClick={() =>
											handleQuantityChange(true)
										}
										disabled={isSubmitting}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</div>

							{/* Jami narx */}
							<div className='bg-gray-50 p-4 rounded-lg'>
								<div className='flex justify-between items-center'>
									<span className='font-medium'>
										Jami summa:
									</span>
									<span className='text-xl font-bold text-red-600'>
										{formatPrice(totalPrice)}
									</span>
								</div>
							</div>

							<DialogFooter className='gap-2'>
								<Button
									type='button'
									variant='outline'
									onClick={handleClose}
									disabled={isSubmitting}
								>
									Bekor qilish
								</Button>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='min-w-[120px]'
								>
									{isSubmitting
										? 'Yuborilmoqda...'
										: 'Buyurtma berish'}
								</Button>
							</DialogFooter>
						</form>
					</>
				) : (
					/* Muvaffaqiyat xabari */
					<div className='text-center py-8'>
						<CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
						<h3 className='text-xl font-bold text-green-600 mb-2'>
							Buyurtma qabul qilindi!
						</h3>
						<p className='text-muted-foreground mb-4'>
							Tez orada siz bilan bog'lanamiz
						</p>
						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<p className='text-sm text-green-800'>
								<strong>Buyurtma ma'lumotlari:</strong>
								<br />
								{formData.firstName} {formData.lastName}
								<br />
								{formData.phoneNumber}
								<br />
								{product.name} - {formData.quantity} dona
								<br />
								<strong>Jami: {formatPrice(totalPrice)}</strong>
							</p>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
