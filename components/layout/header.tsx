'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Clock, MapPin, Menu, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CatalogDropdown } from '../ui/catalog-dropdown'
import { SearchBar } from '../ui/searchbar'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const [isCatalogOpen, setIsCatalogOpen] = useState(false)

	const navigation = [
		{ name: 'Bosh sahifa', href: '/' },
		{ name: 'Mahsulotlar', href: '/products' },
		{ name: 'Katalog', href: '/catalog' },
		{ name: 'Biz haqimizda', href: '/about' },
		{ name: 'Portfolio', href: '/portfolio' },
	]

	const closeMobileMenu = () => setIsOpen(false)

	return (
		<header className='sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
			<div className='hidden lg:flex bg-muted border-b'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col sm:flex-row items-center justify-between py-2 text-sm text-muted-foreground'>
						<div className='flex flex-wrap items-center gap-4 mb-2 sm:mb-0'>
							<div className='hidden lg:flex items-center gap-2'>
								<Phone className='h-4 w-4 text-primary' />
								<span>+998 99 213 48 63</span>
							</div>
							<div className='hidden md:flex items-center gap-2'>
								<MapPin className='h-4 w-4 text-primary' />
								<span>Toshkent, Chilonzor tumani</span>
							</div>
							<div className='hidden lg:flex items-center gap-2'>
								<Clock className='h-4 w-4 text-primary' />
								<span>Dush-Juma: 9:00-18:00</span>
							</div>
						</div>
						<div className='hidden md:flex items-center gap-4'>
							<LanguageSwitcher />
							<div className='hidden sm:flex items-center gap-2'>
								<Link
									href='#'
									className='text-primary hover:text-primary/80 text-sm'
								>
									Facebook
								</Link>
								<Link
									href='#'
									className='text-primary hover:text-primary/80 text-sm'
								>
									Instagram
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent
					side='left'
					className='w-[280px] p-0 bg-secondary text-secondary-foreground'
				>
					<div className='flex items-center justify-between p-4 border-b'>
						<Link href='/' className='flex items-center'>
							<div className='flex flex-col items-= leading-tight'>
								<div className='font-bold tracking-wide text-lg'>
									<span className='text-red-600 italic'>
										HIK
									</span>
									<span className='text-gray-600 ml-1'>
										VISION
									</span>
								</div>
								<div className='text-xs text-white '>
									O'zbekistondagi rasmiy hamkori
								</div>
							</div>
						</Link>
					</div>

					<nav className='flex flex-col p-4'>
						{navigation.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className='flex items-center py-3 px-2 text-base font-medium text-white hover:text-primary hover:bg-muted/50 rounded-md transition-all duration-200'
								onClick={closeMobileMenu}
							>
								{item.name}
							</Link>
						))}
					</nav>

					<div className='mt-auto p-4 border-t bg-muted/30'>
						<div className='space-y-3'>
							<div className='flex items-center gap-2 text-sm'>
								<Phone className='h-4 w-4 text-primary' />
								<span>+998 99 213 48 63</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<MapPin className='h-4 w-4 text-primary' />
								<span>Toshkent, Chilonzor tumani</span>
							</div>
							<div className='flex items-center gap-4 pt-2'>
								<Link
									href='#'
									className='text-primary hover:text-primary/80 text-sm'
								>
									Facebook
								</Link>
								<Link
									href='#'
									className='text-primary hover:text-primary/80 text-sm'
								>
									Instagram
								</Link>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			{/* Main navigation */}
			<div className='py-4  bg-secondary/90 text-white'>
				<div className='container mx-auto px-4'>
					{/* TOP ROW for mobile: menu left, logo center, right */}
					<div className='flex items-center justify-between md:hidden'>
						{/* Left: open sheet with onClick */}

						{/* Center: logo */}
						<Link href='/' className='flex items-center'>
							<div className='flex flex-col items-= leading-tight'>
								<div className='font-bold tracking-wide text-lg'>
									<span className='text-red-600 italic'>
										HIK
									</span>
									<span className='text-gray-600 ml-1'>
										VISION
									</span>
								</div>
								<div className='text-xs text-white '>
									O'zbekistondagi rasmiy hamkori
								</div>
							</div>
						</Link>
						<div className='flex items-center gap-2'>
							<LanguageSwitcher />
							<Button
								variant='ghost'
								size='sm'
								className='p-2'
								onClick={() => setIsOpen(true)}
							>
								<Menu className='h-5 w-5' />
							</Button>
						</div>
					</div>

					{/* BELOW on mobile: Catalog + Search (stacked) */}
					<div className='flex flex-col gap-3 mt-3 md:hidden'>
						<CatalogDropdown
							triggerText='Mahsulotlar katalogi'
							className='bg-primary text-primary-foreground hover:bg-primary/90'
						/>

						<div className='w-full'>
							<SearchBar />
						</div>
					</div>

					{/* DESKTOP / MD+ layout */}
					<div className='hidden md:flex items-center justify-between gap-6'>
						<div className='flex items-center gap-6 flex-1'>
							{/* Logo (desktop) */}
							<Link
								href='/'
								className='flex items-center space-x-2'
							>
								<div className='flex flex-col items-start leading-tight'>
									<div className='font-bold tracking-wide text-2xl'>
										<span className='text-red-600 italic'>
											HIK
										</span>
										<span className='text-gray-600 ml-1'>
											VISION
										</span>
									</div>
									<div className='text-xs text-white mt-0.5'>
										O'zbekistondagi rasmiy hamkori
									</div>
								</div>
							</Link>
						</div>
						<div className='hidden mr-5 md:flex items-center space-x-6'>
							<Link
								href='/products'
								className='text-sm hover:text-secondary-foreground/80 transition-colors'
							>
								Mahsulotlar
							</Link>

							<Link
								href='/portfolio'
								className='text-sm hover:text-secondary-foreground/80 transition-colors'
							>
								Portfolio
							</Link>
							<Link
								href='/about'
								className='text-sm hover:text-secondary-foreground/80 transition-colors'
							>
								Aloqa
							</Link>
						</div>
						
						<CatalogDropdown
							triggerText='Mahsulotlar katalogi'
							className='bg-primary text-primary-foreground hover:bg-primary/90'
						/>

						<div className='flex items-center gap-4'>
							<div className='hidden md:block'>
								<SearchBar />
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
