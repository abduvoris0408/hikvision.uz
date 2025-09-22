'use client'

import { CompanyAbout } from '@/components/sections/company-about'
import { CompanyTeam } from '@/components/sections/company-team'
import { CompanyValues } from '@/components/sections/company-values'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { projects } from '@/lib/data/projects'
import {
	ArrowRight,
	Building2,
	Calendar,
	Camera,
	CheckCircle,
	GraduationCap,
	Hospital,
	MapPin,
	Monitor,
	Play,
	Shield,
	ShoppingCart,
	Wifi,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const Portfolio = () => {
	const [activeCategory, setActiveCategory] = useState('all')
	const [animatedStats, setAnimatedStats] = useState<string[]>([])
	const [isStatsVisible, setIsStatsVisible] = useState(false)
	const statsRef = useRef(null)

	// Animation function for counting numbers
	const animateNumber = (finalNumber: string | number, duration = 2000) => {
		return new Promise<void>(resolve => {
			let start: string = '0'
			const startTime = performance.now()
			const numericValue =
				parseInt(String(finalNumber).replace(/[^\d]/g, '')) || 0

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime
				const progress = Math.min(elapsed / duration, 1)

				// Easing function for smooth animation
				const easeOutCubic = 1 - Math.pow(1 - progress, 3)
				const currentValue = Math.floor(easeOutCubic * numericValue)

				if (
					typeof finalNumber === 'string' &&
					finalNumber.includes('+')
				) {
					start = currentValue + '+'
				} else if (
					typeof finalNumber === 'string' &&
					finalNumber.includes('%')
				) {
					start = currentValue + '%'
				} else if (
					typeof finalNumber === 'string' &&
					finalNumber.includes('/')
				) {
					start = currentValue + '/7'
				} else {
					start = currentValue.toLocaleString()
				}

				if (progress < 1) {
					requestAnimationFrame(animate)
				} else {
					start = String(finalNumber)
					resolve()
				}

				setAnimatedStats(prev => {
					const newStats = [...prev]
					const statIndex = stats.findIndex(
						stat => stat.number === finalNumber
					)
					if (statIndex !== -1) {
						newStats[statIndex] = start
					}
					return newStats
				})
			}

			requestAnimationFrame(animate)
		})
	}

	// Intersection Observer for triggering animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isStatsVisible) {
					setIsStatsVisible(true)

					// Initialize animated stats with zeros
					setAnimatedStats(stats.map(() => '0'))

					// Start animations for each stat with different delays
					stats.forEach((stat, index) => {
						setTimeout(() => {
							animateNumber(stat.number, 2000 + index * 200)
						}, index * 300)
					})
				}
			},
			{ threshold: 0.5 }
		)

		if (statsRef.current) {
			observer.observe(statsRef.current)
		}

		const categories = [
			{ id: 'all', name: 'Barchasi', icon: Shield },
			{ id: 'corporate', name: 'Korporativ', icon: Building2 },
			{ id: 'retail', name: 'Savdo', icon: ShoppingCart },
			{ id: 'education', name: "Ta'lim", icon: GraduationCap },
		]

		return () => observer.disconnect()
	}, [isStatsVisible])

	const categories = [
		{ id: 'all', name: 'Barchasi', icon: Shield },
		{ id: 'corporate', name: 'Korporativ', icon: Building2 },
		{ id: 'retail', name: 'Savdo', icon: ShoppingCart },
		{ id: 'education', name: "Ta'lim", icon: GraduationCap },
		{ id: 'healthcare', name: 'Tibbiyot', icon: Hospital },
	]

	const filteredProjects =
		activeCategory === 'all'
			? projects
			: projects.filter(project => project.category === activeCategory)

	const stats = [
		{ number: '500+', label: 'Loyihalar', icon: Building2 },
		{ number: '10,000+', label: "O'rnatilgan kameralar", icon: Camera },
		{ number: '99.9%', label: 'Ishonchlilik', icon: Shield },
		{ number: '24/7', label: "Qo'llab-quvvatlash", icon: Monitor },
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-r from-blue-200 via-blue-700 to-indigo-400 text-white py-8 overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='relative container mx-auto px-6'>
					<div className='max-w-3xl mx-auto text-center'>
						<Badge className='mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30'>
							<Shield className='w-4 h-4 mr-2' />
							Professional Security Solutions
						</Badge>
						<h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
							Bizning{' '}
							<span className='text-blue-200'>Portfolio</span>
						</h1>
						<p className='text-lg md:text-xl opacity-90 mb-6 leading-relaxed'>
							O'zbekiston bo'ylab 500+ muvaffaqiyatli loyihalar.
							Eng murakkab xavfsizlik masalalarini zamonaviy
							texnologiyalar bilan hal qilamiz.
						</p>
						<div className='flex justify-center space-x-4'>
							<Button
								size='lg'
								className='bg-white text-red-600 hover:bg-blue-50'
							>
								Videoni ko'rish
								<Play className='w-5 h-5 ml-2' />
							</Button>{' '}
							<Button
								size='lg'
								className='bg-white text-blue-600 hover:bg-blue-50'
							>
								Loyihalarni ko'rish
								<ArrowRight className='w-5 h-5 ml-2' />
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section ref={statsRef} className='py-16 bg-white'>
				<div className='container mx-auto px-6'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						{stats.map((stat, index) => (
							<div
								key={index}
								className='text-center border p-3 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
							>
								<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 transition-colors duration-300 hover:bg-blue-200'>
									<stat.icon className='w-8 h-8 text-blue-600' />
								</div>
								<div className='text-3xl font-bold text-gray-900 mb-2 transition-all duration-300'>
									{animatedStats[index] || '0'}
								</div>
								<div className='text-gray-600'>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Filter Section */}
			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
							Muvaffaqiyatli Loyihalar
						</h2>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
							Turli sohalarda amalga oshirilgan loyihalarimiz
							bilan tanishing
						</p>
					</div>

					{/* Category Filter */}
					<div className='flex flex-wrap justify-center gap-4 mb-12'>
						{categories.map(category => (
							<Button
								key={category.id}
								variant={
									activeCategory === category.id
										? 'default'
										: 'outline'
								}
								onClick={() => setActiveCategory(category.id)}
								className={`${
									activeCategory === category.id
										? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
										: 'hover:bg-blue-400 text-gray-700'
								}`}
							>
								<category.icon className='w-4 h-4 mr-2' />
								{category.name}
							</Button>
						))}
					</div>

					{/* Projects Grid */}
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredProjects.map(project => (
							<Card
								key={project.id}
								className='group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white'
							>
								<div className='relative h-64 overflow-hidden'>
									<Image
										height={400}
										width={600}
										src={project.image}
										alt={project.title}
										className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
									<div className='absolute top-4 left-4'>
										<Badge className='bg-blue-600 text-white'>
											{project.cameras}+ Kameralar
										</Badge>
									</div>
								</div>

								<CardContent className='p-6'>
									<div className='flex items-center text-sm text-gray-500 mb-3'>
										<MapPin className='w-4 h-4 mr-1' />
										{project.location}
										<span className='mx-2'>•</span>
										<Calendar className='w-4 h-4 mr-1' />
										{project.date}
									</div>

									<h3 className='font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors'>
										{project.title}
									</h3>

									<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
										{project.description}
									</p>

									<div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
										<div className='flex items-center'>
											<Camera className='w-4 h-4 text-blue-600 mr-2' />
											<span className='text-gray-700'>
												{project.cameras} kamera
											</span>
										</div>
										<div className='flex items-center'>
											<Wifi className='w-4 h-4 text-green-600 mr-2' />
											<span className='text-gray-700'>
												{project.coverage} qamrov
											</span>
										</div>
									</div>

									<div className='flex flex-wrap gap-2 mb-4'>
										{project.tags.map((tag, index) => (
											<Badge
												key={index}
												variant='secondary'
												className='text-xs'
											>
												{tag}
											</Badge>
										))}
									</div>

									<div className='space-y-2'>
										<div className='font-medium text-sm text-gray-700'>
											Asosiy xususiyatlar:
										</div>
										<div className='grid grid-cols-2 gap-1 text-xs'>
											{project.features
												.slice(0, 4)
												.map((feature, index) => (
													<div
														key={index}
														className='flex items-center text-gray-600'
													>
														<CheckCircle className='w-3 h-3 text-green-500 mr-1 flex-shrink-0' />
														<span className='truncate'>
															{feature}
														</span>
													</div>
												))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Success Stories Carousel */}
			<section className='py-16 bg-white overflow-hidden'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							Muvaffaqiyat Tarixi
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							Mijozlarimizning ishonchi va muvaffaqiyatli
							loyihalar natijalari
						</p>
					</div>

					<div className='relative'>
						<div
							className='flex gap-6 animate-[slide_40s_linear_infinite] hover:[animation-play-state:paused]'
							style={{
								width: 'calc(300px * 12)', // 6 items * 2 for seamless loop
							}}
						>
							{[...projects, ...projects].map(
								(project, index) => (
									<div
										key={`${project.id}-${index}`}
										className='flex-shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300'
									>
										<div className='relative h-48'>
											<img
												src={project.image}
												alt={project.title}
												className='w-full h-full object-cover'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
											<div className='absolute bottom-4 left-4 right-4 text-white'>
												<div className='text-sm opacity-90 mb-1'>
													{project.location}
												</div>
												<div className='font-semibold text-lg'>
													{project.cameras}+ Kameralar
												</div>
											</div>
										</div>
										<div className='p-6'>
											<h3 className='font-bold text-lg mb-2 text-gray-900 line-clamp-2'>
												{project.title}
											</h3>
											<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
												{project.description}
											</p>
											<div className='flex items-center justify-between'>
												<Badge className='bg-green-100 text-green-700 hover:bg-green-100'>
													<CheckCircle className='w-3 h-3 mr-1' />
													{project.coverage} qamrov
												</Badge>
												<div className='text-sm text-gray-500'>
													{project.date}
												</div>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</section>

			<section className=' bg-gray-50'>
				<div className='min-h-screen bg-background'>
					<CompanyAbout />
					<CompanyValues />
					<CompanyTeam />
				</div>
			</section>

			<style jsx>{`
				@keyframes slide {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(calc(-300px * 6));
					}
				}
			`}</style>
		</div>
	)
}

export default Portfolio
