import { ContactSection } from '@/components/sections/contact-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProductShowcase } from '@/components/sections/product-showcase'
export default function HomePage() {
	return (
		<div>
			<HeroSection />
			<FeaturesSection />
			<ProductShowcase />
			<ContactSection />
		</div>
	)
}
