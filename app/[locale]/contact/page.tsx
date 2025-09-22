"use client"

import { useTranslations } from "next-intl"
import { ContactHero } from "@/components/sections/contact-hero"
import { ContactForm } from "@/components/sections/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"
import { ContactMap } from "@/components/sections/contact-map"

export default function ContactPage() {
  const t = useTranslations("contactPage")

  return (
    <div className="min-h-screen bg-background">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      <ContactMap />
    </div>
  )
}
