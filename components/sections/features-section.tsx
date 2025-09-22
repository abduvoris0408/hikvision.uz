"use client"

import { useTranslations } from "next-intl"
import { Truck, Headphones, Shield, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Truck,
    titleKey: "features.fastDelivery",
    descKey: "features.fastDeliveryDesc",
    color: "text-red-500",
  },
  {
    icon: Headphones,
    titleKey: "features.support",
    descKey: "features.supportDesc",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    titleKey: "features.guarantee",
    descKey: "features.guaranteeDesc",
    color: "text-green-500",
  },
  {
    icon: CreditCard,
    titleKey: "features.quality",
    descKey: "features.qualityDesc",
    color: "text-purple-500",
  },
]

export function FeaturesSection() {
  const t = useTranslations()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center border space-y-4 p-6 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted ${feature.color}`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
