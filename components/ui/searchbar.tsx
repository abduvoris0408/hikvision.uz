'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
	className?: string
	placeholder?: string
	onSearch?: (query: string) => void
}

export function SearchBar({
	className,
	placeholder = 'Mahsulotlarni qidiring...',
	onSearch,
}: SearchBarProps) {
	const [query, setQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false)

	const handleSearch = () => {
		if (query.trim()) {
			onSearch?.(query.trim())
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	const clearSearch = () => {
		setQuery('')
		setIsFocused(false)
	}

	return (
		<div className={cn('relative flex items-center', className)}>
			<div className='relative flex-1 w-100'>
				<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
				<Input
					type='text'
					placeholder={placeholder}
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyPress={handleKeyPress}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={cn(
						'pl-10 pr-10  bg-background border-border transition-all duration-200 text-black',
						isFocused && 'ring-2 ring-primary/20 border-primary'
					)}
				/>
				{query && (
					<Button
						variant='ghost'
						size='sm'
						onClick={clearSearch}
						className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted'
					>
						<X className='h-3 w-3' />
					</Button>
				)}
			</div>
		</div>
	)
}
