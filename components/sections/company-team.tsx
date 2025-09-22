"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function CompanyTeam() {
  const teamMembers = [
    {
      name: "Aziz Karimov",
      position: "Bosh direktor",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Malika Tosheva",
      position: "Texnik direktor",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Bobur Rahimov",
      position: "Sotuvlar menejeri",
      image: "/placeholder.svg?height=300&width=300",
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
          <h2 className="text-3xl font-bold mb-4">Bizning jamoa</h2>
          <p className="text-lg text-muted-foreground">Professional mutaxassislar jamoasi</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center overflow-hidden">
                <div className="aspect-square bg-muted"></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.position}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
