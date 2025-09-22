import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-background'>
			<div className='text-center space-y-6 max-w-md mx-auto px-4'>
				<div className='space-y-2'>
					<h1 className='text-6xl font-bold text-primary'>404</h1>
					<h2 className='text-2xl font-semibold text-foreground'>Page Not Found</h2>
					<p className='text-muted-foreground'>The page you are looking for doesn't exist or has been moved.</p>
				</div>
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Button asChild>
						<Link href='/uz'>Go to Homepage</Link>
					</Button>
					<Button variant='outline' asChild>
						<Link href='/uz/products'>Browse Products</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
