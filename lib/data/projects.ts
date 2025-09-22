export interface Project {
	id: number
	title: string
	category: string
	location: string
	date: string
	image: string
	cameras: number
	coverage: string
	features: string[]
	description: string
	tags: string[]
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'Tashkent City Mall - Keng qamrovli xavfsizlik tizimi',
		category: 'retail',
		location: "Toshkent, O'zbekiston",
		date: '2024',
		image: '/hikvision-bullet-camera-white-4mp.jpg',
		cameras: 150,
		coverage: '100%',
		features: [
			'4K Ultra HD',
			'Night Vision',
			'AI Analytics',
			'Cloud Storage',
		],
		description:
			"5 qavatli savdo markazida 150+ kamera bilan to'liq xavfsizlik ta'minlandi",
		tags: ['Retail', 'AI Analytics', '4K'],
	},
	{
		id: 2,
		title: 'NBU - Milliy Bank filiali xavfsizlik tizimi',
		category: 'corporate',
		location: "Toshkent, O'zbekiston",
		date: '2024',
		image: '/hikvision-video-intercom-panel-black.jpg',
		cameras: 80,
		coverage: '100%',
		features: [
			'Facial Recognition',
			'Access Control',
			'24/7 Monitoring',
			'Backup Systems',
		],
		description:
			"Bank xavfsizligi uchun yuqori darajadagi monitoring tizimi o'rnatildi",
		tags: ['Banking', 'Facial Recognition', 'High Security'],
	},
	{
		id: 3,
		title: 'Westminster International University - Campus Security',
		category: 'education',
		location: "Toshkent, O'zbekiston",
		date: '2023',
		image: '/hikvision-ptz-dome-camera-gray.jpg',
		cameras: 200,
		coverage: '95%',
		features: [
			'Perimeter Security',
			'Emergency Response',
			'Mobile Access',
			'Smart Analytics',
		],
		description:
			'Universitet kampusida talabalar xavfsizligi uchun zamonaviy tizim',
		tags: ['Education', 'Campus', 'Smart Analytics'],
	},
]
