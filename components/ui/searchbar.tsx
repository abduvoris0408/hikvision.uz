'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface SearchBarProps {
	className?: string
	placeholder?: string
	onSearch?: (query: string) => void
	rotatingWords?: string[]
	rotateIntervalMs?: number
}

export function SearchBar({
	className,
	placeholder = '',
	onSearch,
	rotatingWords = [
		'Hikvision kamera',
		'IP kamera',
		'Qaytish moslamasi',
		'Yangi tovarlar',
	],
	rotateIntervalMs = 3000,
}: SearchBarProps) {
	const [query, setQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false)

	const [index, setIndex] = useState(0)
	const [visible, setVisible] = useState(true)
	const reducedMotion = useRef(false)

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		reducedMotion.current = mq.matches

		if (reducedMotion.current) return

		const interval = setInterval(() => {
			setVisible(false)

			setTimeout(() => {
				setIndex(prev => (prev + 1) % rotatingWords.length)
				setVisible(true)
			}, 250)
		}, rotateIntervalMs)

		return () => clearInterval(interval)
	}, [rotatingWords.length, rotateIntervalMs])

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

	const showRotating = !query && !isFocused && rotatingWords.length > 0

	return (
		<div className={cn('relative flex items-center', className)}>
			<div className='relative flex-1 w-100'>
				<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

				{/* Input */}
				<Input
					type='text'
					placeholder={placeholder}
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyPress={handleKeyPress}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={cn(
						'pl-10 pr-10 bg-background border-border transition-all duration-200 text-black',
						isFocused && 'ring-2 ring-primary/20 border-primary'
					)}
					aria-label='Search'
				/>

				<div
					aria-hidden='true'
					className={cn(
						'pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm font-medium transition-all',
						// color & subtle styling
						'text-slate-500',
						// reduce opacity when input focused or user typed
						showRotating ? 'opacity-100' : 'opacity-0'
					)}
					// keep it out of focus/tab order
				>
					{/* Animated text element */}
					<span
						className={cn(
							'inline-block transform-gpu transition-all duration-250 ease-out',
							visible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 -translate-y-1'
						)}
						style={{
							// Tailwind doesn't have duration-250 by default; we use inline style for exact ms
							transitionDuration: '250ms',
						}}
					>
						{rotatingWords[index]}
					</span>
				</div>

				{/* Clear button */}
				{query && (
					<Button
						variant='ghost'
						size='sm'
						onClick={clearSearch}
						className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted'
						aria-label='Clear search'
					>
						<X className='h-3 w-3' />
					</Button>
				)}
			</div>
		</div>
	)
}
