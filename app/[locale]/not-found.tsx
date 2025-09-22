"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">{t("title")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("description")}</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  )
}
