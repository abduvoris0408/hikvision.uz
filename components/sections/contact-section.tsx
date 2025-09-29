'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { Clock, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useState } from 'react'

export function ContactSection() {
	const t = useTranslations()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold mb-4 text-balance'
					>
						{t('contactsection.sendMessage')}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-muted-foreground text-pretty max-w-2xl mx-auto'
					>
						{t('contactsection.introText', {
							defaultValue:
								"Saytimizga tashrif buyurganingiz uchun tashakkur. Veb-saytimizda biz bilan bog'lanish uchun telefon raqamlarimiz mavjud. Agar sizda biron bir shikoyat, taklif va mulohazalaringiz bo'lsa, quyidagi shaklni to'ldirib, bizga yuborishingiz mumkin.",
						})}
					</motion.p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='space-y-6'
					>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Phone className='h-5 w-5 text-secondary' />
									{t('contactsection.phone')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-lg font-semibold'>
									+998952522222
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<MapPin className='h-5 w-5 text-secondary' />
									{t('contactsection.address')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{t('contactsection.addressText')}</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Clock className='h-5 w-5 text-secondary' />
									{t('contactsection.workTime')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{t('contactsection.workHours')}</p>
							</CardContent>
						</Card>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
					>
						<Card>
							<CardHeader>
								<CardTitle>
									{t('contactsection.sendMessage')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={handleSubmit}
									className='space-y-4'
								>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<Input
											name='name'
											placeholder={t(
												'contactsection.namePlaceholder'
											)}
											value={formData.name}
											onChange={handleChange}
											required
										/>
										<Input
											name='email'
											type='email'
											placeholder={t(
												'contactsection.emailPlaceholder'
											)}
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>
									<Input
										name='subject'
										placeholder={t(
											'contactsection.subjectPlaceholder'
										)}
										value={formData.subject}
										onChange={handleChange}
										required
									/>
									<Textarea
										name='message'
										placeholder={t(
											'contactsection.messagePlaceholder'
										)}
										rows={5}
										value={formData.message}
										onChange={handleChange}
										required
									/>
									<Button type='submit' className='w-full'>
										{t('contactsection.submitButton')}
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
