'use client'

import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
	const t = useTranslations('footer') // namespace qo‘shdik
	const locale = useLocale()

	const productCategories = [
		{ name: t('productCategories.warranty'), href: `/${locale}/warranty` },
		{
			name: t('productCategories.turboHdCamera'),
			href: `/${locale}/products/turbo-hd`,
		},
		{
			name: t('productCategories.turboHdPtz'),
			href: `/${locale}/products/turbo-hd-ptz`,
		},
	]

	const solutions = [
		{ name: t('solutions.dvr'), href: `/${locale}/solutions/dvr` },
		{
			name: t('solutions.ipCamera'),
			href: `/${locale}/solutions/ip-camera`,
		},
		{
			name: t('solutions.intercom'),
			href: `/${locale}/solutions/intercom`,
		},
		{
			name: t('solutions.biometric'),
			href: `/${locale}/solutions/biometric`,
		},
	]

	const departments = [
		{
			name: t('departments.turnstiles'),
			href: `/${locale}/products/turnstiles`,
		},
		{
			name: t('departments.poeManaged'),
			href: `/${locale}/products/poe-managed`,
		},
		{
			name: t('departments.poeUnmanaged'),
			href: `/${locale}/products/poe-unmanaged`,
		},
		{ name: t('departments.nvr'), href: `/${locale}/products/nvr` },
	]

	return (
		<footer className='bg-muted/30 border-t'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
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
									{t('company.partnerText')}
								</div>
							</div>
						</Link>

						<p className='text-sm text-muted-foreground'>
							{t('company.askQuestion')}
						</p>

						<div className='space-y-2'>
							<div className='flex items-center gap-2 text-sm justify-center md:justify-start'>
								<Phone className='h-4 w-4 text-secondary' />
								<a
									href='tel:+998992134863'
									className='font-semibold'
								>
									+998952522222
								</a>
							</div>
							<div className='text-sm text-muted-foreground text-center md:text-left'>
								{t('company.addressLabel')}
							</div>
							<div className='flex items-start gap-2 text-sm justify-center md:justify-start'>
								<MapPin className='h-4 w-4 text-secondary mt-0.5' />
								<span>
									{t('company.addressLine1')}
									<br />
									{t('company.addressLine2')}
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
							{t('productCategories.title')}
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
							{t('solutions.title')}
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
							{t('departments.title')}
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
						© 2020-2025 Hikvision O'zbekiston. {t('bottom.madeBy')}{' '}
						<a
							className='text-secondary'
							href='https://abduvorismominovuz.vercel.app/'
							target='_blank'
							rel='noreferrer'
						>
							Abduvoris Mo'minov
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
