"use client"

import { useTranslations } from "next-intl"
import { CompanyHero } from "@/components/sections/company-hero"
import { CompanyAbout } from "@/components/sections/company-about"
import { CompanyValues } from "@/components/sections/company-values"
import { CompanyStats } from "@/components/sections/company-stats"
import { CompanyTeam } from "@/components/sections/company-team"

export default function AboutPage() {
  const t = useTranslations("company")

  return (
    <div className="min-h-screen bg-background">
      <CompanyHero />
      <CompanyAbout />
      <CompanyValues />
      <CompanyStats />
      <CompanyTeam />
    </div>
  )
}
