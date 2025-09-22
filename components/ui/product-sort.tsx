"use client"

import { useTranslations } from "next-intl"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortOption } from "@/lib/data/products"

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  const t = useTranslations("products")

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder={t("sortBy")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">{t("sortByName")}</SelectItem>
        <SelectItem value="price-low">{t("sortByPriceLow")}</SelectItem>
        <SelectItem value="price-high">{t("sortByPriceHigh")}</SelectItem>
        <SelectItem value="rating">{t("sortByRating")}</SelectItem>
        <SelectItem value="newest">{t("sortByNewest")}</SelectItem>
      </SelectContent>
    </Select>
  )
}
