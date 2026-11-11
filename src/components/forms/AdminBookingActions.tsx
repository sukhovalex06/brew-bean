'use client'

import { useState } from 'react'
import { updateBookingStatusAction } from '@/actions/booking'
import { toast } from 'sonner'
import { CheckCircle, XCircle, CheckSquare } from 'lucide-react'

export function AdminBookingActions({ bookingId, currentStatus }: { bookingId: string, currentStatus: string }) {
  const [isPending, setIsPending] = useState(false)

  const handleUpdate = async (status: string) => {
    setIsPending(true)
    const result = await updateBookingStatusAction(bookingId, status)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
    setIsPending(false)
  }

  // Если бронь уже отменена или завершена, кнопки не показываем
  if (currentStatus === 'cancelled' || currentStatus === 'completed') return null;

  return (
    <div className="flex gap-2">
      {/* Кнопка "Подтвердить" видна только для новых заявок */}
      {currentStatus === 'pending' && (
        <button onClick={() => handleUpdate('confirmed')} disabled={isPending} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" title="Подтвердить бронь">
          <CheckCircle className="w-5 h-5" />
        </button>
      )}
      
      {/* Кнопка "Завершить" видна, когда гости пришли и ушли */}
      {currentStatus === 'confirmed' && (
        <button onClick={() => handleUpdate('completed')} disabled={isPending} className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors" title="Завершить визит">
          <CheckSquare className="w-5 h-5" />
        </button>
      )}
      
      {/* Кнопку отмены можно нажать до завершения визита */}
      {(currentStatus === 'pending' || currentStatus === 'confirmed') && (
        <button onClick={() => handleUpdate('cancelled')} disabled={isPending} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors" title="Отменить">
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}