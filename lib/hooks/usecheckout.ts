// hooks/useCheckout.ts
import { useState } from 'react'

interface CheckoutItem {
	product_id: number
	quantity: number
}

interface CheckoutData {
	full_name: string
	phone_number: string
	items: CheckoutItem[]
}

interface CheckoutResponse {
	id?: number
	message?: string
	status?: string
	order_number?: string
}

interface UseCheckoutReturn {
	isLoading: boolean
	error: string | null
	success: boolean
	submitOrder: (data: CheckoutData) => Promise<boolean>
	clearError: () => void
	clearSuccess: () => void
}

const API_BASE_URL = 'http://hikvision-back.khayitovdev.uz/api'

export const useCheckout = (): UseCheckoutReturn => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const clearError = () => {
		setError(null)
	}

	const clearSuccess = () => {
		setSuccess(false)
	}

	const submitOrder = async (data: CheckoutData): Promise<boolean> => {
		setIsLoading(true)
		setError(null)
		setSuccess(false)

		try {
			// Basic auth credentials (admin:1)
			const credentials = btoa('admin:1')

			console.log('Sending order data:', data)

			const response = await fetch(`${API_BASE_URL}/checkout/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${credentials}`,
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			})

			console.log('Response status:', response.status)
			console.log('Response headers:', response.headers)

			if (!response.ok) {
				let errorMessage = 'Buyurtma yuborishda xatolik yuz berdi'

				try {
					const errorData = await response.json()
					console.log('Error response data:', errorData)

					if (errorData.message) {
						errorMessage = errorData.message
					} else if (errorData.detail) {
						errorMessage = errorData.detail
					} else if (errorData.error) {
						errorMessage = errorData.error
					} else if (errorData.non_field_errors) {
						errorMessage = Array.isArray(errorData.non_field_errors)
							? errorData.non_field_errors[0]
							: errorData.non_field_errors
					} else if (typeof errorData === 'string') {
						errorMessage = errorData
					}
				} catch (parseError) {
					console.error('Failed to parse error response:', parseError)

					// Status-based error messages
					switch (response.status) {
						case 400:
							errorMessage =
								"Ma'lumotlar noto'g'ri formatda yoki to'liq emas"
							break
						case 401:
							errorMessage =
								'Avtorizatsiya xatosi. Tizimga kira olmadik'
							break
						case 403:
							errorMessage =
								"Buyurtma berish uchun ruxsatingiz yo'q"
							break
						case 404:
							errorMessage =
								'API topilmadi. Iltimos, administratorga murojaat qiling'
							break
						case 422:
							errorMessage = "Ma'lumotlar validatsiyadan o'tmadi"
							break
						case 429:
							errorMessage =
								"Juda ko'p so'rov yuborildi. Biroz kutib, qayta urinib ko'ring"
							break
						case 500:
							errorMessage =
								"Server ichki xatosi. Keyinroq urinib ko'ring"
							break
						case 502:
							errorMessage =
								"Server javob bermayapti. Keyinroq urinib ko'ring"
							break
						case 503:
							errorMessage =
								"Xizmat vaqtincha ishlamayapti. Keyinroq urinib ko'ring"
							break
						default:
							errorMessage = `Server xatosi (${response.status}). Keyinroq urinib ko\'ring`
					}
				}

				throw new Error(errorMessage)
			}

			// Success response handling
			let result: CheckoutResponse | null = null
			try {
				const responseText = await response.text()
				console.log('Response text:', responseText)

				if (responseText.trim()) {
					result = JSON.parse(responseText)
					console.log('Parsed response:', result)
				}
			} catch (parseError) {
				console.log(
					'Response is not JSON or empty, but request was successful'
				)
			}

			setSuccess(true)
			console.log('Order submitted successfully:', result)
			return true
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Buyurtma yuborishda noma'lum xatolik yuz berdi"
			setError(errorMessage)
			console.error('Checkout error:', err)
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		success,
		submitOrder,
		clearError,
		clearSuccess,
	}
}

// Export types for use in components
export type { CheckoutData, CheckoutItem, CheckoutResponse }
