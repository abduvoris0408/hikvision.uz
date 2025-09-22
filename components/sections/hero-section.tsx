'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const heroSlides = [
	{
		id: 1,
		title: 'Video kuzatuv kameralari',
		subtitle:
			'Hikvision videokuzatuv tizimlari, jumladan, xavfsizlik kameralari ishlab chiqaruvchi yetakchi kompaniyalardan biri hisoblanadi. Hikvision kameralari',
		image: '/hikvision-dome-camera-white-8mp.jpg',
		cta: 'BATAFSIL',
	},
	{
		id: 2,
		title: 'Professional xavfsizlik yechimlari',
		subtitle:
			"Eng so'nggi texnologiyalar asosida yaratilgan IP kameralar, NVR tizimlari va boshqa xavfsizlik uskunalari",
		image: '/hikvision-bullet-camera-white-4mp.jpg',
		cta: 'BATAFSIL',
	},
	{
		id: 3,
		title: 'Interkomlar va turniketlar',
		subtitle:
			'Zamonaviy kirish nazorati tizimlari, video interkomlar va avtomatik turniketlar',
		image: '/hikvision-face-recognition-terminal-black.jpg',
		cta: 'BATAFSIL',
	},
]

export function HeroSection() {
	const t = useTranslations()
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroSlides.length)
		}, 5000)
		return () => clearInterval(timer)
	}, [])

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % heroSlides.length)
	}

	const prevSlide = () => {
		setCurrentSlide(
			prev => (prev - 1 + heroSlides.length) % heroSlides.length
		)
	}

	return (
		<section className='relative h-[650px] md:h-[810px] overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -300 }}
					transition={{ duration: 0.5 }}
					className='absolute inset-0'
				>
					<div className='container mx-auto px-4 h-full flex items-center'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full'>
							{/* Content */}
							

							{/* Image */}
							<div className='relative h-[300px] md:h-[400px] lg:h-[500px]'>
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3, duration: 0.7 }}
									className='relative h-full w-full rounded-lg overflow-hidden shadow-2xl'
								>
									<Image
										src={
											heroSlides[currentSlide].image ||
											'/placeholder.svg'
										}
										alt={heroSlides[currentSlide].title}
										fill
										className='object-cover'
										priority
									/>
								</motion.div>
							</div>
              <div className='space-y-6 animate-fade-in-up'>
								<motion.h1
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className='text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight'
								>
									{heroSlides[currentSlide].title}
								</motion.h1>
								<motion.p
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className='text-lg text-muted-foreground text-pretty max-w-2xl'
								>
									{heroSlides[currentSlide].subtitle}
								</motion.p>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className='flex flex-col sm:flex-row gap-4'
								>
									<Button size='lg' className='group'>
										{heroSlides[currentSlide].cta}
										<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
									</Button>
									<Button variant='outline' size='lg'>
										Aloqa
									</Button>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation Arrows */}
			<Button
				variant='ghost'
				size='icon'
				className='absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm'
				onClick={prevSlide}
			>
				<ChevronLeft className='h-6 w-6' />
			</Button>
			<Button
				variant='ghost'
				size='icon'
				className='absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm'
				onClick={nextSlide}
			>
				<ChevronRight className='h-6 w-6' />
			</Button>

			{/* Slide Indicators */}
			<div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
				{heroSlides.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-all ${
							index === currentSlide
								? 'bg-secondary scale-125'
								: 'bg-background/50'
						}`}
						onClick={() => setCurrentSlide(index)}
					/>
				))}
			</div>
		</section>
	)
}
