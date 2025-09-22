'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function ContactHero() {
	const t = useTranslations('contactPage')

	return (
		<section className='bg-gradient-to-r from-secondary/10 to-secondary/5 py-20'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-3xl mx-auto'
				>
					<h1 className='text-2xl md:text-3xl font-bold text-foreground mb-6'>
						{t('title')}
					</h1>
					<p className='text-xl text-muted-foreground'>
						{t('subtitle')}
					</p>
				</motion.div>
			</div>
		</section>
	)
}
