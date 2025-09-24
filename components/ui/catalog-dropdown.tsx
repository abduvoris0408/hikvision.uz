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
	Wifi, // generic icon for "accessories"
	Zap,
} from 'lucide-react'
import Link from 'next/link'

interface CategoryItem {
	name: string
	href: string
	icon?: LucideIcon
	colorClass?: string // bg color class for icon circle
	hasSubmenu?: boolean
	submenu?: CategoryItem[]
}

// map categories with icons + color classes
const categories: CategoryItem[] = [
	{
		name: 'Turniketlar',
		href: '/catalog/turnstiles',
		icon: Repeat,
		colorClass: 'from-pink-200 to-pink-100',
	},
	{
		name: 'Sistemalar kontroli va boshqaruv dostup',
		href: '/catalog/access-control',
		icon: Key,
		colorClass: 'from-indigo-200 to-indigo-100',
		hasSubmenu: true,
		submenu: [
			{
				name: 'Kartali tizimlar',
				href: '/catalog/access-control/card-systems',
				icon: GitPullRequest,
				colorClass: 'from-rose-200 to-rose-100',
			},
			{
				name: 'Biometrik tizimlar',
				href: '/catalog/access-control/biometric',
				icon: Fingerprint,
				colorClass: 'from-amber-200 to-amber-100',
			},
			{
				name: 'Parol tizimlari',
				href: '/catalog/access-control/password',
				icon: Key,
				colorClass: 'from-lime-200 to-lime-100',
			},
		],
	},
	{
		name: 'Video kuzatuv tizimlari',
		href: '/catalog/video-surveillance',
		icon: Camera,
		colorClass: 'from-sky-200 to-sky-100',
		hasSubmenu: true,
		submenu: [
			{
				name: 'IP kameralar',
				href: '/catalog/video-surveillance/ip-cameras',
				icon: Camera,
				colorClass: 'from-sky-200 to-sky-100',
			},
			{
				name: 'Analog kameralar',
				href: '/catalog/video-surveillance/analog',
				icon: Camera,
				colorClass: 'from-blue-200 to-blue-100',
			},
			{
				name: 'DVR/NVR',
				href: '/catalog/video-surveillance/recorders',
				icon: Server,
				colorClass: 'from-violet-200 to-violet-100',
			},
		],
	},
	{
		name: 'Shlagbaum tizimlari',
		href: '/catalog/barriers',
		icon: ShieldCheck,
		colorClass: 'from-cyan-200 to-cyan-100',
	},
	{
		name: "ZKTeco O'zbekiston",
		href: '/catalog/zkteco',
		icon: ShieldCheck,
		colorClass: 'from-rose-200 to-rose-100',
	},
	{
		name: "Yong'in signalizatsiya tizimlari",
		href: '/catalog/fire-alarm',
		icon: Zap,
		colorClass: 'from-amber-200 to-amber-100',
	},
	{
		name: 'Tarmoq uskunalari',
		href: '/catalog/network',
		icon: Wifi,
		colorClass: 'from-emerald-200 to-emerald-100',
		hasSubmenu: true,
		submenu: [
			{
				name: 'Switchlar',
				href: '/catalog/network/switches',
				icon: Server,
				colorClass: 'from-emerald-200 to-emerald-100',
			},
			{
				name: 'Routerlar',
				href: '/catalog/network/routers',
				icon: Wifi,
				colorClass: 'from-teal-200 to-teal-100',
			},
			{
				name: 'Wi-Fi uskunalari',
				href: '/catalog/network/wifi',
				icon: Wifi,
				colorClass: 'from-sky-200 to-sky-100',
			},
		],
	},
	{
		name: 'Aksessuarlar va boshqalar',
		href: '/catalog/accessories',
		icon: Plug,
		colorClass: 'from-zinc-200 to-zinc-100',
	},
	{
		name: 'Kabellar',
		href: '/catalog/cables',
		icon: Cable,
		colorClass: 'from-stone-200 to-stone-100',
	},
	{
		name: 'Aqlli uy',
		href: '/catalog/smart-home',
		icon: GitPullRequest,
		colorClass: 'from-lime-200 to-lime-100',
	},
	{
		name: 'Himoya Eshiklari',
		href: '/catalog/security-doors',
		icon: ShieldCheck,
		colorClass: 'from-rose-200 to-rose-100',
	},
]

interface CatalogDropdownProps {
	triggerText?: string
	className?: string
}

export function CatalogDropdown({
	triggerText = 'Katalog',
	className = '',
}: CatalogDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-medium  transition-colors'>
					<Grid className='h-4 w-4' />
					Mahsulotlar katalogi
					<ChevronDown className='ml-1 h-4 w-4 opacity-80' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-96 max-h-96 overflow-y-auto p-2'>
				{categories.map((category, index) => (
					<div key={category.name}>
						{category.hasSubmenu && category.submenu ? (
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className='flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-slate-50 transition-colors'>
									<div className='flex items-center gap-3'>
										<span
											className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${category.colorClass} text-white`}
											aria-hidden
										>
											{category.icon ? (
												<category.icon className='h-4 w-4 text-primary/90' />
											) : (
												<Grid className='h-4 w-4' />
											)}
										</span>

										<span className='text-sm'>
											{category.name}
										</span>
									</div>
									<ChevronRight className='h-4 w-4 text-muted-foreground' />
								</DropdownMenuSubTrigger>

								<DropdownMenuSubContent className='w-72 p-2'>
									<DropdownMenuItem asChild>
										<Link
											href={category.href}
											className='w-full block px-3 py-2 rounded-md hover:bg-slate-50'
										>
											<div className='text-sm font-medium'>
												{category.name} (Barchasi)
											</div>
										</Link>
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									{category.submenu.map(subItem => (
										<DropdownMenuItem
											asChild
											key={subItem.name}
										>
											<Link
												href={subItem.href}
												className='w-full block px-3 py-2 rounded-md hover:bg-slate-50'
											>
												<div className='flex items-center gap-3'>
													<span className='inline-flex items-center justify-center h-6 w-6 rounded bg-muted text-muted-foreground'>
														{subItem.icon ? (
															<subItem.icon className='h-4 w-4' />
														) : (
															'•'
														)}
													</span>
													<span className='text-sm'>
														{subItem.name}
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
											className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${category.colorClass} text-white`}
										>
											{category.icon ? (
												<category.icon className='h-4 w-4 text-primary/90' />
											) : (
												<Grid className='h-4 w-4' />
											)}
										</span>
										<span className='text-sm'>
											{category.name}
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
