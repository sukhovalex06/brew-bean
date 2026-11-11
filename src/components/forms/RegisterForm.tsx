'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { registerAction } from '@/actions/auth'
import Link from 'next/link'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsPending(true)
    const formData = new FormData()
    formData.append('fullName', data.fullName)
    formData.append('email', data.email)
    formData.append('password', data.password)

    const result = await registerAction(formData)
    
    if (result?.success === false) {
      toast.error(result.message)
      setIsPending(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-latte/10">
      <h2 className="text-2xl font-serif text-coffee text-center mb-6">Создать аккаунт</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Имя и Фамилия</label>
          <input
            {...register('fullName')}
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
            placeholder="Александр Иванов"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
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

        <div>
          <label className="block text-sm font-medium text-coffee mb-2">Пароль</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-latte/30 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-coffee text-cream rounded-xl hover:bg-terracotta transition-colors font-medium text-lg disabled:opacity-50"
        >
          {isPending ? 'Создаем аккаунт...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="text-center text-coffee/70 mt-6">
        Уже есть аккаунт? <Link href="/login" className="text-terracotta hover:underline font-medium">Войти</Link>
      </p>
    </div>
  )
}