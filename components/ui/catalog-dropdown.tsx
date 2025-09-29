'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Cable,
	Camera,
	ChevronDown,
	ChevronRight,
	Fingerprint,
	GitPullRequest,
	Grid,
	Key,
	LucideIcon,
	Plug,
	Repeat,
	Server,
	ShieldCheck,
	Wifi,
	Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface CategoryItem {
	nameKey: string
	href: string
	icon?: LucideIcon
	colorClass?: string
	hasSubmenu?: boolean
	submenu?: CategoryItem[]
}

const categories: CategoryItem[] = [
	{
		nameKey: 'categories.turnstiles',
		href: '/catalog/turnstiles',
		icon: Repeat,
		colorClass: 'from-pink-200 to-pink-100',
	},
	{
		nameKey: 'categories.accessControl',
		href: '/catalog/access-control',
		icon: Key,
		colorClass: 'from-indigo-200 to-indigo-100',
		hasSubmenu: true,
		submenu: [
			{
				nameKey: 'categories.cardSystems',
				href: '/catalog/access-control/card-systems',
				icon: GitPullRequest,
				colorClass: 'from-rose-200 to-rose-100',
			},
			{
				nameKey: 'categories.biometric',
				href: '/catalog/access-control/biometric',
				icon: Fingerprint,
				colorClass: 'from-amber-200 to-amber-100',
			},
			{
				nameKey: 'categories.password',
				href: '/catalog/access-control/password',
				icon: Key,
				colorClass: 'from-lime-200 to-lime-100',
			},
		],
	},
	{
		nameKey: 'categories.videoSurveillance',
		href: '/catalog/video-surveillance',
		icon: Camera,
		colorClass: 'from-sky-200 to-sky-100',
		hasSubmenu: true,
		submenu: [
			{
				nameKey: 'categories.ipCameras',
				href: '/catalog/video-surveillance/ip-cameras',
				icon: Camera,
				colorClass: 'from-sky-200 to-sky-100',
			},
			{
				nameKey: 'categories.analogCameras',
				href: '/catalog/video-surveillance/analog',
				icon: Camera,
				colorClass: 'from-blue-200 to-blue-100',
			},
			{
				nameKey: 'categories.recorders',
				href: '/catalog/video-surveillance/recorders',
				icon: Server,
				colorClass: 'from-violet-200 to-violet-100',
			},
		],
	},
	{
		nameKey: 'categories.barriers',
		href: '/catalog/barriers',
		icon: ShieldCheck,
		colorClass: 'from-cyan-200 to-cyan-100',
	},
	{
		nameKey: 'categories.zkteco',
		href: '/catalog/zkteco',
		icon: ShieldCheck,
		colorClass: 'from-rose-200 to-rose-100',
	},
	{
		nameKey: 'categories.fireAlarm',
		href: '/catalog/fire-alarm',
		icon: Zap,
		colorClass: 'from-amber-200 to-amber-100',
	},
	{
		nameKey: 'categories.network',
		href: '/catalog/network',
		icon: Wifi,
		colorClass: 'from-emerald-200 to-emerald-100',
		hasSubmenu: true,
		submenu: [
			{
				nameKey: 'categories.switches',
				href: '/catalog/network/switches',
				icon: Server,
				colorClass: 'from-emerald-200 to-emerald-100',
			},
			{
				nameKey: 'categories.routers',
				href: '/catalog/network/routers',
				icon: Wifi,
				colorClass: 'from-teal-200 to-teal-100',
			},
			{
				nameKey: 'categories.wifi',
				href: '/catalog/network/wifi',
				icon: Wifi,
				colorClass: 'from-sky-200 to-sky-100',
			},
		],
	},
	{
		nameKey: 'categories.accessories',
		href: '/catalog/accessories',
		icon: Plug,
		colorClass: 'from-zinc-200 to-zinc-100',
	},
	{
		nameKey: 'categories.cables',
		href: '/catalog/cables',
		icon: Cable,
		colorClass: 'from-stone-200 to-stone-100',
	},
	{
		nameKey: 'categories.smartHome',
		href: '/catalog/smart-home',
		icon: GitPullRequest,
		colorClass: 'from-lime-200 to-lime-100',
	},
	{
		nameKey: 'categories.securityDoors',
		href: '/catalog/security-doors',
		icon: ShieldCheck,
		colorClass: 'from-rose-200 to-rose-100',
	},
]

interface CatalogDropdownProps {
	className?: string
}

export function CatalogDropdown({ className = '' }: CatalogDropdownProps) {
	const t = useTranslations()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-medium transition-colors'>
					<Grid className='h-4 w-4' />
					{t('categories.catalog')}
					<ChevronDown className='ml-1 h-4 w-4 opacity-80' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-72 max-h-[500px] overflow-y-auto p-2'>
				{categories.map((category, index) => (
					<div key={category.nameKey}>
						{category.hasSubmenu && category.submenu ? (
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className='flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-slate-50 transition-colors cursor-pointer'>
									<div className='flex items-center gap-3'>
										<span
											className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${category.colorClass}`}
											aria-hidden='true'
										>
											{category.icon ? (
												<category.icon className='h-4 w-4 text-primary/90' />
											) : (
												<Grid className='h-4 w-4' />
											)}
										</span>
										<span className='text-sm font-medium'>
											{t(category.nameKey)}
										</span>
									</div>
									<ChevronRight className='h-4 w-4 text-muted-foreground' />
								</DropdownMenuSubTrigger>

								<DropdownMenuSubContent
									className='w-72 p-2 ml-1'
									sideOffset={8}
								>
									<DropdownMenuItem asChild>
										<Link
											href={category.href}
											className='w-full block px-3 py-2 rounded-md hover:bg-slate-50 transition-colors'
										>
											<div className='text-sm font-semibold text-primary'>
												{t('categories.all')}
											</div>
										</Link>
									</DropdownMenuItem>

									<DropdownMenuSeparator className='my-1' />

									{category.submenu.map(subItem => (
										<DropdownMenuItem
											asChild
											key={subItem.nameKey}
										>
											<Link
												href={subItem.href}
												className='w-full block px-3 py-2 rounded-md hover:bg-slate-50 transition-colors'
											>
												<div className='flex items-center gap-3'>
													<span className='inline-flex items-center justify-center h-6 w-6 rounded bg-muted text-muted-foreground'>
														{subItem.icon ? (
															<subItem.icon className='h-3.5 w-3.5' />
														) : (
															'•'
														)}
													</span>
													<span className='text-sm'>
														{t(subItem.nameKey)}
													</span>
												</div>
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						) : (
							<DropdownMenuItem asChild>
								<Link
									href={category.href}
									className='w-full block px-3 py-2 rounded-md hover:bg-slate-50 transition-colors'
								>
									<div className='flex items-center gap-3'>
										<span
											className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${category.colorClass}`}
										>
											{category.icon ? (
												<category.icon className='h-4 w-4 text-primary/90' />
											) : (
												<Grid className='h-4 w-4' />
											)}
										</span>
										<span className='text-sm font-medium'>
											{t(category.nameKey)}
										</span>
									</div>
								</Link>
							</DropdownMenuItem>
						)}

						{index < categories.length - 1 && (
							<DropdownMenuSeparator className='my-1' />
						)}
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
