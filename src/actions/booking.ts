'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createBookingAction(formData: FormData) {
  const supabase = await createClient()

  // Получаем данные из формы
  const guest_name = formData.get('name') as string
  const guest_email = formData.get('email') as string
  const booking_date = formData.get('date') as string
  const booking_time = formData.get('time') as string
  const guests_count = Number(formData.get('guests'))

  // Пытаемся получить текущего пользователя (если он авторизован)
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('bookings').insert({
    guest_name,
    guest_email,
    booking_date,
    booking_time,
    guests_count,
    user_id: user?.id || null, // Привязываем к профилю, если авторизован
    status: 'pending'
  })

  if (error) {
    console.error('Ошибка создания брони:', error)
    return { success: false, message: 'Не удалось создать бронирование. Попробуйте позже.' }
  }

  // Обновляем кэш страницы админки и ЛК, чтобы новая бронь сразу появилась там
  revalidatePath('/account/bookings')
  revalidatePath('/admin/bookings')

  return { success: true, message: 'Столик успешно забронирован! Мы ждем вас.' }
}
export async function cancelBookingAction(bookingId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { success: false, message: 'Не авторизован' }

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .eq('user_id', user.id) // Защита: отменить можно только свою бронь

  if (error) {
    return { success: false, message: 'Не удалось отменить бронирование.' }
  }

  revalidatePath('/account/bookings')
  revalidatePath('/admin/bookings')
  
  return { success: true, message: 'Бронь успешно отменена.' }
}
export async function updateBookingStatusAction(id: string, status: string) {
  const supabase = await createClient()
  
  // Проверяем права администратора
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Нет доступа' }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { success: false, message: 'Требуются права администратора' }

  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)

  if (error) return { success: false, message: 'Ошибка обновления статуса' }

  revalidatePath('/admin/bookings')
  revalidatePath('/account/bookings')
  return { success: true, message: 'Статус успешно обновлен' }
}