'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Award, Shield, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'

const heroSlides = [
	{
		id: 1,
		title: 'Video kuzatuv kameralari',
		subtitle:
			'Hikvision videokuzatuv tizimlari, jumladan, xavfsizlik kameralari ishlab chiqaruvchi yetakchi kompaniyalardan biri hisoblanadi. Eng yuqori sifat va ishonchlilik.',
		image: '/hikvision-dome-camera-white-8mp.jpg',
		cta: "MAHSULOTLARNI KO'RING",
		features: ['4K Ultra HD', 'AI Analytics', 'Night Vision'],
		gradient: 'from-blue-600/20 via-purple-600/20 to-cyan-600/20',
		accent: 'blue',
	},
	{
		id: 2,
		title: 'Professional xavfsizlik yechimlari',
		subtitle:
			"Eng so'nggi texnologiyalar asosida yaratilgan IP kameralar, NVR tizimlari va boshqa xavfsizlik uskunalari. To'liq xavfsizlik ekotizimi.",
		image: '/hikvision-bullet-camera-white-4mp.jpg',
		cta: "YECHIMLARNI O'RGANING",
		features: ['IP Technology', 'Cloud Storage', 'Remote Access'],
		gradient: 'from-emerald-600/20 via-teal-600/20 to-green-600/20',
		accent: 'emerald',
	},
	{
		id: 3,
		title: 'Interkomlar va turniketlar',
		subtitle:
			"Zamonaviy kirish nazorati tizimlari, video interkomlar va avtomatik turniketlar. Biometrik autentifikatsiya va Sun'iy intellekt texnologiyalari.",
		image: '/hikvision-face-recognition-terminal-black.jpg',
		cta: "TEXNOLOGIYANI SINAB KO'RING",
		features: ['Face Recognition', 'Biometric Access', 'Smart Control'],
		gradient: 'from-orange-600/20 via-red-600/20 to-pink-600/20',
		accent: 'orange',
	},
]

const statsData = [
	{ icon: Shield, label: 'Xavfsizlik darajasi', value: '99.9%' },
	{ icon: Award, label: 'Sertifikatlangan', value: '500+' },
	{ icon: Star, label: 'Mijozlar baholashi', value: '4.9/5' },
]

// Accent ranglarni oldindan map qilish (Tailwind purge muammosiz ishlaydi)
const accentClasses: Record<string, string> = {
	blue: 'bg-blue-600 hover:bg-blue-700 text-blue-600',
	emerald: 'bg-emerald-600 hover:bg-emerald-700 text-emerald-600',
	orange: 'bg-orange-600 hover:bg-orange-700 text-orange-600',
}

// Reusable Stats
const SlideStats = ({ accent }: { accent: keyof typeof accentClasses }) => (
	<div className='grid grid-cols-3 gap-3 lg:gap-6 pt-6 lg:pt-8'>
		{statsData.map((stat, i) => (
			<div key={i} className='text-center'>
				<stat.icon
					className={`h-5 w-5 lg:h-6 lg:w-6 ${
						accentClasses[accent].split(' ')[2]
					} mx-auto mb-2`}
				/>
				<div className='text-lg lg:text-2xl font-bold text-foreground'>
					{stat.value}
				</div>
				<div className='text-xs lg:text-sm text-muted-foreground'>
					{stat.label}
				</div>
			</div>
		))}
	</div>
)

export function HeroSection() {
	const t = useTranslations()
	const [currentSlide, setCurrentSlide] = useState(0)
	const slide = heroSlides[currentSlide]

	useEffect(() => {
		const timer = setInterval(
			() => setCurrentSlide(p => (p + 1) % heroSlides.length),
			4000
		)
		return () => clearInterval(timer)
	}, [])

	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
		>
			{/* Background Decorations */}
			<div className='absolute inset-0'>
				<div className='absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 lg:px-8 h-full flex items-center min-h-screen'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full'>
					{/* Image */}
					<div className='lg:col-span-5 relative order-1 lg:order-2'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={slide.id}
								initial={{ x: 200, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -200, opacity: 0 }}
								transition={{ duration: 0.5 }}
								className='relative h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl border border-white/20 shadow-2xl'
							>
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									className='object-cover'
									priority
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent' />
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Content */}
					<div className='lg:col-span-7 space-y-6 order-2 lg:order-1'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={slide.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.4 }}
								className='space-y-6'
							>
								<Badge className='bg-white/20 text-slate-700 border-white/30'>
									Professional Security Solutions
								</Badge>

								<h1 className='text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white'>
									{slide.title}
								</h1>

								<p className='text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed'>
									{slide.subtitle}
								</p>

								<div className='flex flex-wrap gap-2'>
									{slide.features.map(f => (
										<span
											key={f}
											className='px-3 py-1 text-sm bg-background/60 backdrop-blur-sm rounded-full border border-border/50 text-foreground/80'
										>
											{f}
										</span>
									))}
								</div>

								<Button
									size='lg'
									className={`group ${accentClasses[
										slide.accent
									]
										.split(' ')
										.slice(0, 2)
										.join(' ')} text-white`}
								>
									{slide.cta}
									<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
								</Button>

								<SlideStats
									accent={
										slide.accent as keyof typeof accentClasses
									}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Indicators */}
			<div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
				{heroSlides.map((s, i) => (
					<button
						key={s.id}
						onClick={() => setCurrentSlide(i)}
						className={`w-2 h-2 rounded-full transition-all ${
							i === currentSlide
								? accentClasses[slide.accent].split(' ')[0] +
								  ' w-6'
								: 'bg-white/40'
						}`}
					/>
				))}
			</div>
		</section>
	)
}
