import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { PageTransition } from '@/components/ui/page-transition'
import { SplashScreen } from '@/components/ui/splash-screen'
import { Analytics } from '@vercel/analytics/next'
import { Loader } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist_Mono, Work_Sans } from 'next/font/google'
import type React from 'react'
import { Suspense } from 'react'
import '../globals.css'

const workSans = Work_Sans({
	subsets: ['latin'],
	variable: '--font-work-sans',
	display: 'swap',
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
	display: 'swap',
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const messages = await getMessages({ locale })

	return {
		title:
			locale === 'uz'
				? "Hikvision O'zbekiston - Xavfsizlik kameralari va tizimlar"
				: locale === 'ru'
				? 'Hikvision Узбекистан - Камеры безопасности и системы'
				: 'Hikvision Uzbekistan - Security Cameras and Systems',
		description:
			locale === 'uz'
				? "Professional xavfsizlik kameralari, video kuzatuv tizimlari va boshqa xavfsizlik yechimlar. Hikvision rasmiy hamkori O'zbekistonda."
				: locale === 'ru'
				? 'Профессиональные камеры безопасности, системы видеонаблюдения и другие решения безопасности. Официальный партнер Hikvision в Узбекистане.'
				: 'Professional security cameras, video surveillance systems and other security solutions. Official Hikvision partner in Uzbekistan.',
		keywords:
			'hikvision, kamera, xavfsizlik, video kuzatuv, IP kamera, PTZ kamera, NVR, DVR',
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const messages = await getMessages()

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<Suspense
				fallback={
					<div>
						Loading...
					</div>
				}
			>
				<SplashScreen />
				<ErrorBoundary>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main className='flex-1'>
							<PageTransition>{children}</PageTransition>
						</main>
						<Footer />
					</div>
				</ErrorBoundary>
				<Analytics />
			</Suspense>
		</NextIntlClientProvider>
	)
}
