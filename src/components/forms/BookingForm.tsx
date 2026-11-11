'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { createBookingAction } from '@/actions/booking'

// Схема валидации
const bookingSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 буквы'),
  email: z.string().email('Введите корректный email'),
  date: z.string().min(1, 'Выберите дату'),
  time: z.string().min(1, 'Выберите время'),
  guests: z.number().min(1, 'Минимум 1 гость').max(10, 'Максимум 10 гостей'),
})

type BookingFormValues = z.infer<typeof bookingSchema>

export function BookingForm() {
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
    },
  })

  const onSubmit = async (data: BookingFormValues) => {
    setIsPending(true)
    
    // Формируем FormData для передачи в Server Action
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('date', data.date)
    formData.append('time', data.time)
    formData.append('guests', data.guests.toString())

    const result = await createBookingAction(formData)

    if (result.success) {
      toast.success(result.message)
      reset() // Очищаем форму после успеха
    } else {
      toast.error(result.message)
    }
    
    setIsPending(false)
  }

  // Получаем завтрашнюю дату для минимального значения в календаре
const [midDate, setMinDate] = useState('')

useEffect(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  setMinDate(tomorrow.toISOString().split('T')[0])
}, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-latte/10">
      
      {/* Имя и Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Ваше имя</label>
          <input
            {...register('name')}
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
            placeholder="Александр"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
            placeholder="alex@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Дата, Время и Гости */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Дата</label>
          <input
            {...register('date')}
            type="date"
            min={minDate}
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Время</label>
          <select
            {...register('time')}
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
          >
            <option value="">Выберите время</option>
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
            <option value="18:00">18:00</option>
            <option value="20:00">20:00</option>
          </select>
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Кол-во гостей</label>
          <input
            {...register('guests', { valueAsNumber: true })}
            type="number"
            min="1"
            max="10"
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
          />
          {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-coffee text-cream rounded-xl hover:bg-terracotta transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Бронируем...' : 'Подтвердить бронирование'}
      </button>
    </form>
  )
}