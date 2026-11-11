import { createClient } from '@/lib/supabase/server'
import { CancelBookingButton } from '@/components/forms/CancelBookingButton'
import { CalendarX2 } from 'lucide-react'

export const instant = false
export const metadata = { title: 'Мои брони | BREW & BEAN' }

export default async function BookingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Запрашиваем брони текущего пользователя (от новых к старым)
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user?.id)
    .order('booking_date', { ascending: false })

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-latte/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarX2 className="w-10 h-10 text-terracotta" />
        </div>
        <h2 className="text-2xl font-serif text-coffee mb-3">У вас пока нет бронирований</h2>
        <p className="text-coffee/70">Самое время запланировать визит к нам!</p>
      </div>
    )
  }

  // Хелпер для статусов
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">Ожидает</span>
      case 'confirmed': return <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">Подтверждено</span>
      case 'cancelled': return <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">Отменено</span>
      case 'completed': return <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Завершено</span>
      default: return null
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-coffee mb-8">История бронирований</h1>
      
      <div className="space-y-4">
        {bookings.map((booking) => {
          // Безопасное форматирование даты (чтобы избежать hydration error)
          const formattedDate = booking.booking_date.split('-').reverse().join('.')
          const formattedTime = booking.booking_time.slice(0, 5)

          return (
            <div key={booking.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-latte/20 rounded-2xl hover:border-terracotta/30 transition-colors gap-4 bg-cream/10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-xl text-coffee">
                    {formattedDate} в {formattedTime}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-sm text-coffee/70">
                  Гостей: <strong className="text-coffee">{booking.guests_count}</strong> • На имя: <strong className="text-coffee">{booking.guest_name}</strong>
                </p>
              </div>
              
              {/* Кнопка отмены видна только для активных броней */}
              {(booking.status === 'pending' || booking.status === 'confirmed') && (
                <CancelBookingButton bookingId={booking.id} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}