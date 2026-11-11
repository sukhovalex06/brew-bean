'use client'

import { useState } from 'react'
import { cancelBookingAction } from '@/actions/booking'
import { toast } from 'sonner'

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isPending, setIsPending] = useState(false)

  const handleCancel = async () => {
    if (!confirm('Вы уверены, что хотите отменить эту бронь?')) return
    
    setIsPending(true)
    const result = await cancelBookingAction(bookingId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
    setIsPending(false)
  }

  return (
    <button 
      onClick={handleCancel}
      disabled={isPending}
      className="px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
    >
      {isPending ? 'Отмена...' : 'Отменить'}
    </button>
  )
}