import { useState } from 'react'
import { toast } from 'sonner'

interface ReviewData {
  product_id: number
  name: string
  message: string
  rating: number
}

interface Review {
  id: number
  product_id: number
  name: string
  message: string
  rating: number
  created_at: string
}

export const useReviews = () => {
  const [loading, setLoading] = useState(false)
  
  const createReview = async (reviewData: ReviewData) => {
    setLoading(true)
    try {
      // Basic auth uchun login:password ni base64 ga encode qilish
      const credentials = btoa('admin:1')
      
      const response = await fetch('https://hikvision-back.khayitovdev.uz/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Basic ${credentials}`,
          'X-CSRFTOKEN': 'yAm6TZdWucra0z24a4BRxKsMnrmIGba9b9e2dnJD4j6a3s5ztUvrYA3AQHLOLhx3'
        },
        body: JSON.stringify(reviewData)
      })

      if (!response.ok) {
        throw new Error('Sharh yuborishda xatolik yuz berdi')
      }

      const result = await response.json()
      toast.success('Sharh muvaffaqiyatli yuborildi!')
      return result
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Noma\'lum xatolik yuz berdi')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    createReview,
    loading
  }
}