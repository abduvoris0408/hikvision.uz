"use client"

import { memo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export const ProductSearch = memo(function ProductSearch({ value, onChange }: ProductSearchProps) {
  const t = useTranslations("products")

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
})
