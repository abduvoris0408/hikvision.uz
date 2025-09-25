'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Clock, MapPin, Menu, Phone, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CatalogDropdown } from '../ui/catalog-dropdown'
import { SearchBar } from '../ui/searchbar'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	// Scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navigation = [
		{ name: 'Bosh sahifa', href: '/', ariaLabel: 'Home page' },
		{ name: 'Mahsulotlar', href: '/products', ariaLabel: 'Products page' },
		{ name: 'Biz haqimizda', href: '/about', ariaLabel: 'About us page' },
		{ name: 'Portfolio', href: '/portfolio', ariaLabel: 'Portfolio page' },
	]

	const socialLinks = [
		{ name: 'Facebook', href: '#', ariaLabel: 'Visit our Facebook page' },
		{ name: 'Instagram', href: '#', ariaLabel: 'Visit our Instagram page' },
		{ name: 'WhatsApp', href: '#', ariaLabel: 'Visit our WhatsApp page' },
	]

	const contactInfo = [
		{
			icon: Phone,
			text: '+998952522222',
			ariaLabel: 'Contact phone number',
		},
		{
			icon: MapPin,
			text: 'Toshkent, Chilonzor tumani',
			ariaLabel: 'Our location',
		},
		{
			icon: Clock,
			text: 'Dush-Juma: 9:00-18:00',
			ariaLabel: 'Working hours',
		},
	]

	const Logo = () => (
		<Link
			href='/'
			className='flex items-center group'
			aria-label='Home page'
		>
			<div className='relative'>
				{/* Glow effect behind logo */}
				<div className='absolute -inset-2 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500'></div>

				<div className='relative flex items-center gap-3'>
					{/* Logo icon with gradient */}
					<div className='relative'>
						<div className='absolute inset-0 bg-red-500/30 rounded-xl animate-pulse opacity-0 group-hover:opacity-100'></div>
					</div>

					<div className='flex flex-col leading-tight'>
						<div className='font-bold tracking-wide text-2xl md:text-3xl'>
							<span className='text-red-600 italic'>HIK</span>
							<span className='text-slate-700 ml-1'>VISION</span>
						</div>
						<div className='flex items-center gap-1 mt-1'>
							<Star className='w-3 h-3 text-amber-400 fill-amber-400' />
							<span className='text-xs text-slate-600 font-medium'>
								O'zbekistondagi rasmiy hamkori
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)

	return (
		<header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				isScrolled
					? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50'
					: 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30 shadow-xs'
			}`}
		>
			<div className='hidden md:flex bg-red-500 text-white border-b border-slate-700/50'>
				<div className='container mx-auto px-6 py-3'>
					<div className='flex flex-wrap items-center justify-between text-sm gap-6'>
						<div className='flex items-center gap-8'>
							{contactInfo.map(
								({ icon: Icon, text, ariaLabel }, index) => (
									<div
										key={index}
										className='flex items-center gap-3 group bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer'
									>
										<div className='relative'>
											<Icon
												className='h-5 w-5 text-white  transition-colors duration-300 group-hover:scale-110'
												aria-hidden='true'
											/>
										</div>
										<span
											className='font-medium text-white group-hover:text-white transition-colors duration-300'
											aria-label={ariaLabel}
										>
											{text}
										</span>
									</div>
								)
							)}
						</div>
						<div className='flex items-center gap-6'>
							<div className='relative'>
								<LanguageSwitcher />
							</div>
							<div className='flex items-center gap-4'>
								{socialLinks.map(
									({ name, href, ariaLabel }) => (
										<Link
											key={name}
											href={href}
											className='relative px-4 py-2 text-white hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 group overflow-hidden'
											aria-label={ariaLabel}
										>
											<span className='relative z-10'>
												{name}
											</span>
											<div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></div>
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu Sheet - Enhanced with modern colors */}


<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent
    side="left"
    className="w-[320px] p-0 bg-white text-slate-900 border-r border-slate-200 shadow-xl flex flex-col"
  >
    {/* Header */}
    <div className="p-6 border-b border-slate-200 bg-slate-50">
      <Logo />
    </div>

    {/* Navigation */}
    <nav className="flex flex-col p-6 flex-1" role="navigation">
      {navigation.map((item, index) => (
        <Link
          key={item.name}
          href={item.href}
          className={`group relative py-4 px-5 text-base font-medium rounded-xl transition-all duration-300 transform hover:translate-x-2 overflow-hidden ${
            index !== navigation.length - 1 ? "mb-2" : ""
          } hover:bg-red-50 hover:text-red-600`}
          onClick={() => setIsOpen(false)}
          aria-label={item.ariaLabel}
        >
          <span className="relative z-10">{item.name}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-200/0 to-red-100 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="absolute left-0 top-1/2 w-1 h-0 bg-red-500 rounded-full group-hover:h-8 transform -translate-y-1/2 transition-all duration-300"></div>
        </Link>
      ))}
    </nav>

    {/* Footer */}
    <div className="p-6 border-t border-slate-200 bg-slate-50">
      <div className="space-y-5">
        {contactInfo.map(({ icon: Icon, text, ariaLabel }, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-sm group hover:bg-red-50 p-3 rounded-lg transition-all duration-300"
          >
            <Icon
              className="h-5 w-5 text-slate-600 group-hover:text-red-500 transition-colors duration-300"
              aria-hidden="true"
            />
            <span
              className="text-slate-700 group-hover:text-red-600 transition-colors duration-300"
              aria-label={ariaLabel}
            >
              {text}
            </span>
          </div>
        ))}

        <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-200">
          {socialLinks.map(({ name, href, ariaLabel }) => (
            <Link
              key={name}
              href={href}
              className="px-4 py-2 text-slate-500 hover:text-red-600 font-medium transition-all duration-300 rounded-lg hover:bg-red-50 transform hover:scale-105"
              aria-label={ariaLabel}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>



			{/* Main Navigation Bar - Enhanced with modern colors */}
			<div className='relative py-5 bg-gradient-to-r from-transparent to-red-600/5'>
				<div className='container mx-auto px-6'>
					{/* Mobile Layout */}
					<div className='flex md:hidden items-center justify-between'>
						<Logo />
						<div className='flex items-center gap-3'>
							<LanguageSwitcher />
							<Button
								variant='ghost'
								size='icon'
								className='relative text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-105 group overflow-hidden border border-slate-200 hover:border-blue-300'
								onClick={() => setIsOpen(true)}
								aria-label='Open menu'
							>
								<Menu className='h-6 w-6 transition-transform duration-300 group-hover:rotate-90' />
								<div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></div>
							</Button>
						</div>
					</div>

					<div className='md:hidden flex flex-col gap-4 mt-5'>
						<CatalogDropdown
							triggerText='Mahsulotlar katalogi'
							className='bg-red-400 text-white hover:from-red-700 hover:to-purple-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]'
						/>
						<div className='relative'>
							<SearchBar className='bg-slate-100/80 backdrop-blur-sm text-slate-700 placeholder-slate-500 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20' />
							<div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 rounded-xl pointer-events-none'></div>
						</div>
					</div>

					{/* Desktop Layout */}
					<div className='hidden md:flex items-center justify-between gap-8'>
						<Logo />
						<nav
							className='flex items-center gap-8'
							role='navigation'
						>
							{navigation.slice(1).map((item, index) => (
								<Link
									key={item.name}
									href={item.href}
									className='relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 group overflow-hidden transform hover:-translate-y-0.5'
									aria-label={item.ariaLabel}
								>
									<span className='relative z-10'>
										{item.name}
									</span>
									<div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-600 group-hover:w-full transition-all duration-300'></div>
									<div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
								</Link>
							))}
						</nav>
						<div className='flex items-center gap-4 flex-1 justify-end'>
							<CatalogDropdown
								triggerText='Mahsulotlar katalogi'
								className='bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
							/>
							<div className='relative max-w-sm'>
								<SearchBar className='bg-slate-100/80 backdrop-blur-sm text-slate-700 placeholder-slate-500 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20' />
								<div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 rounded-xl pointer-events-none'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
