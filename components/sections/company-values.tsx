"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function CompanyValues() {
  const t = useTranslations("company")

  const values = [
    {
      icon: Award,
      title: t("quality"),
      description: t("qualityText"),
    },
    {
      icon: Users,
      title: t("service"),
      description: t("serviceText"),
    },
    {
      icon: Zap,
      title: t("innovation"),
      description: t("innovationText"),
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("values")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
