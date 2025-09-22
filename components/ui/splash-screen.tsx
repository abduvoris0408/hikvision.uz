'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SplashScreen() {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className='fixed inset-0 z-50 flex items-center justify-center bg-background'
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='text-center'
					>
						<div className='flex flex-col  leading-tight'>
							<div className='font-bold tracking-wide text-4xl'>
								<span className='text-red-600 italic'>HIK</span>
								<span className='text-gray-600 ml-1'>
									VISION
								</span>
							</div>
							<div className='text-xs text-white '>
								O'zbekistondagi rasmiy hamkori
							</div>
						</div>

						<div className='text-muted-foreground'>
							O'zbekistondagi rasmiy hamkori
						</div>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 1.5, delay: 0.5 }}
							className='h-1 bg-secondary mt-4 rounded-full'
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
