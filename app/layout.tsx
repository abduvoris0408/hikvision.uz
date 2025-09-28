import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/wishlistcontext'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist_Mono, Work_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
export const metadata: Metadata = {
	title: 'Hikvision',
	description: 'Created with',
}
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
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${workSans.variable} ${geistMono.variable} antialiased`}
			>
				{' '}
				<NextTopLoader color='blue' />
				<CartProvider>
					<WishlistProvider>{children}</WishlistProvider>
				</CartProvider>
				<Analytics />
				<Toaster closeButton position='top-center' />
			</body>
		</html>
	)
}
