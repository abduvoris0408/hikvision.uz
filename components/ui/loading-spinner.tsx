"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className={cn("border-2 border-muted border-t-secondary rounded-full", sizeClasses[size], className)}
    />
  )
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
          className="w-2 h-2 bg-secondary rounded-full"
        />
      ))}
    </div>
  )
}
