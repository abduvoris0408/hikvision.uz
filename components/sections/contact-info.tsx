"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function ContactInfo() {
  const t = useTranslations("contactPage")
  const tContact = useTranslations("contact")

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Contact Information */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-xl font-semibold">{t("getInTouch")}</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-secondary mt-1" />
              <div>
                <p className="font-medium">+998 99 213 48 63</p>
                <p className="text-sm text-muted-foreground">Telegram mavjud</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-secondary mt-1" />
              <div>
                <p className="font-medium">info@uzhikvision.uz</p>
                <p className="text-sm text-muted-foreground">24/7 javob beramiz</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-secondary mt-1" />
              <div>
                <p className="font-medium">{t("location")}</p>
                <p className="text-sm text-muted-foreground">{tContact("addressText")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-secondary mt-1" />
              <div>
                <p className="font-medium">{t("officeHours")}</p>
                <p className="text-sm text-muted-foreground">{tContact("workHours")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t("socialMedia")}</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
