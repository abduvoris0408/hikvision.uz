'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/context/wishlistcontext'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'

interface WishlistIconProps {
	variant?: 'default' | 'compact'
	showText?: boolean
}

export function WishlistIcon({
	variant = 'default',
	showText = true,
}: WishlistIconProps) {
	const locale = useLocale()
	const { wishlistCount } = useWishlist()

	if (variant === 'compact') {
		return (
			<Link href={`/${locale}/wishlist`}>
				<Button variant='ghost' size='sm' className='relative'>
					<Heart className='h-5 w-5' />
					{wishlistCount > 0 && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className='absolute -top-1 -right-1'
						>
							<Badge
								variant='destructive'
								className='h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600'
							>
								{wishlistCount > 99 ? '99+' : wishlistCount}
							</Badge>
						</motion.div>
					)}
				</Button>
			</Link>
		)
	}

	return (
		<Link href={`/${locale}/wishlist`}>
			<Button
				variant='ghost'
				className='relative flex items-center gap-2 hover:bg-pink-50 hover:text-pink-600 transition-colors'
			>
				<div className='relative'>
					<Heart className='h-5 w-5' />
					{wishlistCount > 0 && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className='absolute -top-2 -right-2'
						>
							<Badge
								variant='destructive'
								className='h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600'
							>
								{wishlistCount > 99 ? '99+' : wishlistCount}
							</Badge>
						</motion.div>
					)}
				</div>
				{showText && (
					<span className='font-medium'>
						Sevimlilar {wishlistCount > 0 && `(${wishlistCount})`}
					</span>
				)}
			</Button>
		</Link>
	)
}
