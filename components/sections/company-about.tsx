"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function CompanyAbout() {
  const t = useTranslations("company")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-6">{t("aboutUs")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t("aboutText")}</p>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{t("mission")}</h3>
                  <p className="text-muted-foreground">{t("missionText")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{t("vision")}</h3>
                  <p className="text-muted-foreground">{t("visionText")}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-secondary mb-4">2020</div>
                <p className="text-lg text-muted-foreground">Tashkil etilgan yil</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
