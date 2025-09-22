'use client'

import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
	const t = useTranslations()
	const locale = useLocale()

	const productCategories = [
		{ name: 'Garantiya', href: `/${locale}/warranty` },
		{ name: 'Turbo HD Kamera', href: `/${locale}/products/turbo-hd` },
		{ name: 'Turbo HD PTZ', href: `/${locale}/products/turbo-hd-ptz` },
	]

	const solutions = [
		{
			name: 'DVR (Digital Video Recorder)',
			href: `/${locale}/solutions/dvr`,
		},
		{ name: 'IP Kamera', href: `/${locale}/solutions/ip-camera` },
		{ name: 'Domofony', href: `/${locale}/solutions/intercom` },
		{
			name: 'Biometricheskie sistemy',
			href: `/${locale}/solutions/biometric`,
		},
	]

	const departments = [
		{ name: 'Turniketlar', href: `/${locale}/products/turnstiles` },
		{ name: 'POE Managed Switch', href: `/${locale}/products/poe-managed` },
		{
			name: 'POE Unmanaged Switch',
			href: `/${locale}/products/poe-unmanaged`,
		},
		{
			name: 'NVR (Network Video Recorder)',
			href: `/${locale}/products/nvr`,
		},
	]

	return (
		<footer className='bg-muted/30 border-t'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
						{/* Logo (HIK red, VISION gray) */}
						<Link href='/' className='flex items-center'>
							<div className='flex flex-col items-= leading-tight'>
								<div className='font-bold tracking-wide text-2xl'>
									<span className='text-red-600 italic'>
										HIK
									</span>
									<span className='text-gray-600 ml-1'>
										VISION
									</span>
								</div>
								<div className='text-xs text-black '>
									O'zbekistondagi rasmiy hamkori
								</div>
							</div>
						</Link>

						<p className='text-sm text-muted-foreground'>
							Savolingiz bormi? Qo'ng'iroq qiling!
						</p>

						<div className='space-y-2'>
							<div className='flex items-center gap-2 text-sm justify-center md:justify-start'>
								<Phone className='h-4 w-4 text-secondary' />
								<a
									href='tel:+998992134863'
									className='font-semibold'
								>
									+998 99 213 48 63
								</a>
							</div>
							<div className='text-sm text-muted-foreground text-center md:text-left'>
								Biz shu manzildamiz
							</div>
							<div className='flex items-start gap-2 text-sm justify-center md:justify-start'>
								<MapPin className='h-4 w-4 text-secondary mt-0.5' />
								<span>
									Toshkent shahri, Chilanzar tumani,
									<br />
									Arnasoy ko'chasi 7A
								</span>
							</div>
						</div>

						<div className='flex items-center gap-4 mt-1'>
							<Link
								href='#'
								className='text-secondary hover:text-secondary/80'
							>
								<Facebook className='h-5 w-5' />
							</Link>
							<Link
								href='#'
								className='text-secondary hover:text-secondary/80'
							>
								<Instagram className='h-5 w-5' />
							</Link>
						</div>
					</div>

					{/* Product Categories */}
					<div className='text-center md:text-left'>
						<h3 className='font-semibold text-foreground mb-3'>
							O'tishlar
						</h3>
						<ul className='space-y-2'>
							{productCategories.map(item => (
								<li key={item.name}>
									<Link
										href={item.href}
										className='text-sm text-muted-foreground hover:text-secondary transition-colors'
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Solutions */}
					<div className='text-center md:text-left'>
						<h3 className='font-semibold text-foreground mb-3'>
							Bo'limlar
						</h3>
						<ul className='space-y-2'>
							{solutions.map(item => (
								<li key={item.name}>
									<Link
										href={item.href}
										className='text-sm text-muted-foreground hover:text-secondary transition-colors'
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Departments */}
					<div className='text-center md:text-left'>
						<h3 className='font-semibold text-foreground mb-3'>
							Bo'limlar
						</h3>
						<ul className='space-y-2'>
							{departments.map(item => (
								<li key={item.name}>
									<Link
										href={item.href}
										className='text-sm text-muted-foreground hover:text-secondary transition-colors'
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t mt-8 pt-8 text-center'>
					<p className='text-sm text-muted-foreground'>
						© 2020-2025 Hikvision O'zbekiston. Tayyorlandi:{' '}
						<a
							className='text-secondary'
							href='/'
							target='_blank'
							rel='noreferrer'
						>
							NDT team uz
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
