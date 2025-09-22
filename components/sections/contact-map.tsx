'use client'

import { Card } from '@/components/ui/card'
import { useEffect, useRef } from 'react'

export function ContactMap() {
	const mapRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<any>(null)

	useEffect(() => {
		// Yandex Maps API ni yuklash
		const loadYandexMaps = () => {
			if (window.ymaps) {
				window.ymaps.ready(initMap)
				return
			}

			const script = document.createElement('script')
			script.src =
				'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=uz_UZ'
			script.onload = () => {
				window.ymaps.ready(initMap)
			}
			document.head.appendChild(script)
		}

		const initMap = () => {
			if (mapInstanceRef.current) return

			// Toshkent, Chilanzar tumani koordinatalari
			const coordinates = [41.2646, 69.2163] // Chilanzar tumani, Arnasoy kochasi taxminiy koordinatalari

			mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
				center: coordinates,
				zoom: 16,
				controls: [
					'zoomControl',
					'fullscreenControl',
					'geolocationControl',
				],
			})

			// Marker qo'shish
			const placemark = new window.ymaps.Placemark(
				coordinates,
				{
					balloonContent: `
		  <div style="padding: 10px;">
			<h3 style="margin: 0 0 10px 0; color: #333;">Bizning Ofis</h3>
			<p style="margin: 0; color: #666;">Toshkent shahri, Chilanzar tumani, Arnasoy kochasi 7A</p>
		  </div>
		`,
					hintContent: 'Bizning ofis manzili',
				},
				{
					preset: 'islands#redDotIcon',
					iconColor: '#ff6b6b',
				}
			)

			mapInstanceRef.current.geoObjects.add(placemark)

			// Xarita stilini sozlash
			mapInstanceRef.current.options.set({
				suppressMapOpenBlock: true,
				yandexMapDisablePoiInteractivity: true,
			})
		}

		loadYandexMaps()

		// Cleanup
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.destroy()
				mapInstanceRef.current = null
			}
		}
	}, [])

	return (
		<section className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-8'>
					<h2 className='text-3xl font-bold mb-4'>Bizning Manzil</h2>
					<p className='text-lg text-muted-foreground'>
						Toshkent shahri, Chilanzar tumani, Arnasoy kochasi 7A
					</p>
				</div>

				<Card className='overflow-hidden shadow-lg'>
					<div
						ref={mapRef}
						className='h-96 w-full bg-muted flex items-center justify-center'
						style={{ minHeight: '400px' }}
					>
						<div className='text-center text-muted-foreground'>
							<div className='animate-pulse'>
								<div className='w-8 h-8 bg-primary rounded-full mx-auto mb-2'></div>
								<p className='text-sm'>Xarita yuklanmoqda...</p>
							</div>
						</div>
					</div>
				</Card>

				<div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card className='p-6 text-center'>
						<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
							<svg
								className='w-6 h-6 text-primary'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
						</div>
						<h3 className='font-semibold mb-2'>Manzil</h3>
						<p className='text-sm text-muted-foreground'>
							Toshkent shahri, Chilanzar tumani, Arnasoy kochasi
							7A
						</p>
					</Card>

					<Card className='p-6 text-center'>
						<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
							<svg
								className='w-6 h-6 text-primary'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
								/>
							</svg>
						</div>
						<h3 className='font-semibold mb-2'>Telefon</h3>
						<p className='text-sm text-muted-foreground'>
							+998 71 123 45 67
						</p>
					</Card>

					<Card className='p-6 text-center'>
						<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
							<svg
								className='w-6 h-6 text-primary'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h3 className='font-semibold mb-2'>Ish vaqti</h3>
						<p className='text-sm text-muted-foreground'>
							Dush-Juma: 9:00 - 18:00
							<br />
							Shanba: 9:00 - 14:00
						</p>
					</Card>
				</div>
			</div>
		</section>
	)
}
