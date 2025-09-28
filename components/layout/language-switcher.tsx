'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const languages = [
	{ code: 'uz', name: "O'zbek", flag: '🇺🇿' },
	{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
	{ code: 'en', name: 'English', flag: '🇺🇸' },
]

export function LanguageSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const currentLanguage =
		languages.find(lang => lang.code === locale) ?? languages[0]

	const handleLanguageChange = (newLocale: string) => {
		// pathname ni segmentlarga ajratamiz
		const segments = pathname.split('/').filter(Boolean)

		// birinchi segment locale bo'lsa, almashtiramiz
		if (languages.some(lang => lang.code === segments[0])) {
			segments[0] = newLocale
		} else {
			segments.unshift(newLocale)
		}

		const newPath = '/' + segments.join('/')
		router.push(newPath)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm' className='gap-2'>
					<Globe className='h-4 w-4' />
					<span className='hidden sm:inline'>
						{currentLanguage.name}
					</span>
					<span className='sm:hidden'>{currentLanguage.flag}</span>
					<ChevronDown className='h-3 w-3' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{languages.map(language => (
					<DropdownMenuItem
						key={language.code}
						onClick={() => handleLanguageChange(language.code)}
						className='gap-2 cursor-pointer'
					>
						<span>{language.flag}</span>
						<span>{language.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
