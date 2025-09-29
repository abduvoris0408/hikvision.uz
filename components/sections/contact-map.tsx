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
					></div>
				</Card>
			</div>
		</section>
	)
}
