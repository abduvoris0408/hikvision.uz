'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useReviews } from '@/lib/hooks/useReviews'
import type { Review } from '@/types/product'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

interface ReviewsComponentProps {
	productId: number
	reviews: Review[]
	onReviewAdded?: () => void
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({
	productId,
	reviews,
	onReviewAdded,
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		message: '',
		rating: 0,
	})
	const [hoveredRating, setHoveredRating] = useState(0)

	const { createReview, loading } = useReviews()

	const renderStars = (rating: number, interactive: boolean = false) => {
		return Array.from({ length: 5 }, (_, index) => {
			const starNumber = index + 1
			const isFilled = interactive
				? starNumber <= (hoveredRating || formData.rating)
				: starNumber <= rating

			return (
				<Star
					key={index}
					className={`w-4 h-4 ${
						interactive ? 'cursor-pointer' : ''
					} ${
						isFilled
							? 'fill-yellow-400 text-yellow-400'
							: 'text-gray-300'
					}`}
					onClick={
						interactive
							? () =>
									setFormData(prev => ({
										...prev,
										rating: starNumber,
									}))
							: undefined
					}
					onMouseEnter={
						interactive
							? () => setHoveredRating(starNumber)
							: undefined
					}
					onMouseLeave={
						interactive ? () => setHoveredRating(0) : undefined
					}
				/>
			)
		})
	}

	const formatDate = (dateString?: string) => {
		if (!dateString) return '—'
		const date = new Date(dateString)
		const now = new Date()
		const diffTime = Math.abs(now.getTime() - date.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		if (diffDays === 1) return '1 kun oldin'
		if (diffDays < 7) return `${diffDays} kun oldin`
		if (diffDays < 30) return `${Math.ceil(diffDays / 7)} hafta oldin`
		return `${Math.ceil(diffDays / 30)} oy oldin`
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (
			!formData.name.trim() ||
			!formData.message.trim() ||
			formData.rating === 0
		) {
			return
		}

		try {
			await createReview({
				product_id: productId,
				name: formData.name,
				message: formData.message,
				rating: formData.rating,
			})

			setFormData({ name: '', message: '', rating: 0 })
			setIsDialogOpen(false)
			onReviewAdded?.()
		} catch (error) {
			// Error handling is done in the hook
		}
	}

	const resetForm = () => {
		setFormData({ name: '', message: '', rating: 0 })
		setHoveredRating(0)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h3 className='text-lg font-semibold'>
					Mijozlar sharhlari ({reviews.length})
				</h3>

				<Dialog
					open={isDialogOpen}
					onOpenChange={open => {
						setIsDialogOpen(open)
						if (!open) resetForm()
					}}
				>
					<DialogTrigger asChild>
						<Button variant='outline'>Sharh yozish</Button>
					</DialogTrigger>

					<DialogContent className='sm:max-w-md'>
						<DialogHeader>
							<DialogTitle>Sharh yozish</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<Label htmlFor='name'>Ismingiz</Label>
								<Input
									id='name'
									type='text'
									placeholder='Ismingizni kiriting'
									value={formData.name}
									onChange={e =>
										setFormData(prev => ({
											...prev,
											name: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div>
								<Label>Baholash</Label>
								<div className='flex gap-1 mt-1'>
									{renderStars(formData.rating, true)}
								</div>
							</div>

							<div>
								<Label htmlFor='message'>Sharhingiz</Label>
								<Textarea
									id='message'
									placeholder='Mahsulot haqida fikringizni yozing...'
									value={formData.message}
									onChange={e =>
										setFormData(prev => ({
											...prev,
											message: e.target.value,
										}))
									}
									rows={4}
									required
								/>
							</div>

							<div className='flex gap-2 pt-4'>
								<Button
									type='button'
									variant='outline'
									onClick={() => setIsDialogOpen(false)}
									className='flex-1'
								>
									Bekor qilish
								</Button>
								<Button
									type='submit'
									disabled={
										loading ||
										!formData.name.trim() ||
										!formData.message.trim() ||
										formData.rating === 0
									}
									className='flex-1'
								>
									{loading ? 'Yuborilmoqda...' : 'Yuborish'}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className='space-y-4'>
				{reviews.length === 0 ? (
					<Card>
						<CardContent className='p-8 text-center'>
							<p className='text-muted-foreground'>
								Hali sharhlar yo'q. Birinchi bo'lib sharh
								qoldiring!
							</p>
						</CardContent>
					</Card>
				) : (
					reviews.map(review => {
						// safety: ensure required display fields exist or fallback
						const name = review.name ?? 'Foydalanuvchi'
						const message = review.message ?? ''
						const createdAt =
							review.created_at ?? review.created_at ?? ''
						const rating = review.rating ?? 0 // <-- ensure number

						return (
							<Card key={String(review.id)}>
								<CardContent className='p-4'>
									<div className='flex items-start gap-4'>
										<div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
											<span className='text-sm font-medium'>
												{name.charAt(0).toUpperCase()}
											</span>
										</div>
										<div className='flex-1 space-y-2'>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>
													{name}
												</span>
												<div className='flex'>
													{renderStars(rating)}
												</div>
											</div>
											<p className='text-sm text-muted-foreground'>
												{message}
											</p>
											<span className='text-xs text-muted-foreground'>
												{formatDate(createdAt)}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						)
					})
				)}
			</div>
		</div>
	)
}

export default ReviewsComponent
