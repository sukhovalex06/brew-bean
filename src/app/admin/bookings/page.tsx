import { createClient } from '@/lib/supabase/server'
import { AdminBookingActions } from '@/components/forms/AdminBookingActions'
import { Users, Mail } from 'lucide-react'

export const metadata = { title: 'Все бронирования | Админ' }

export default async function AdminBookingsPage() {
  const supabase = await createClient()

  // Получаем все бронирования, самые новые сверху
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">Новая заявка</span>
      case 'confirmed': return <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">Одобрено</span>
      case 'cancelled': return <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">Отменено</span>
      case 'completed': return <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Завершено</span>
      default: return null
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-coffee mb-8">Управление бронированиями</h1>
      
      <div className="bg-cream/10 border border-latte/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-latte/10 text-coffee text-sm uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-latte/20">Дата и время</th>
                <th className="p-4 font-medium border-b border-latte/20">Гость</th>
                <th className="p-4 font-medium border-b border-latte/20">Детали</th>
                <th className="p-4 font-medium border-b border-latte/20">Статус</th>
                <th className="p-4 font-medium border-b border-latte/20 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-latte/10">
              {bookings?.map((booking) => {
                const formattedDate = booking.booking_date.split('-').reverse().join('.')
                const formattedTime = booking.booking_time.slice(0, 5)

                return (
                  <tr key={booking.id} className="hover:bg-cream/30 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-coffee">{formattedDate}</p>
                      <p className="text-sm text-coffee/70">{formattedTime}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-coffee">{booking.guest_name}</p>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-coffee/70">
                        <Users className="w-4 h-4 text-terracotta" /> {booking.guests_count} персон
                      </div>
                      <div className="flex items-center gap-2 text-sm text-coffee/70">
                        <Mail className="w-4 h-4 text-terracotta" /> {booking.guest_email}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="p-4 flex justify-end">
                      <AdminBookingActions bookingId={booking.id} currentStatus={booking.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          {(!bookings || bookings.length === 0) && (
            <div className="p-8 text-center text-coffee/70">
              Пока нет ни одного бронирования.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}