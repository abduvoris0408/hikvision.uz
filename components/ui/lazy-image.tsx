"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className={cn("relative", className, fill ? "w-full h-full" : "")}
      style={!fill && width && height ? { width, height } : {}}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          priority={priority}
          className={cn(
            "transition-opacity duration-300 object-cover",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  )
}
