"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function CompanyStats() {
  const t = useTranslations("company")

  const stats = [
    { number: "4+", label: t("experience") },
    { number: "500+", label: t("projects") },
    { number: "1000+", label: t("clients") },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("team")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-secondary mb-2">{stat.number}</div>
              <p className="text-lg text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
