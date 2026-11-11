'use client'

import { useState } from 'react'
import { addMenuItemAction } from '@/actions/menu'
import { toast } from 'sonner'

export function AddMenuForm() {
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    
    const result = await addMenuItemAction(formData)
    if (result.success) {
      toast.success(result.message)
      ;(e.target as HTMLFormElement).reset()
    } else {
      toast.error(result.message)
    }
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 p-6 bg-cream/30 rounded-2xl border border-latte/20">
      <div>
        <label className="block text-sm text-coffee mb-1">Название</label>
        <input name="name" required className="w-full px-3 py-2 rounded-lg border border-latte/30 outline-none focus:border-terracotta" />
      </div>
      <div>
        <label className="block text-sm text-coffee mb-1">Категория</label>
        <select name="category" required className="w-full px-3 py-2 rounded-lg border border-latte/30 outline-none focus:border-terracotta bg-white">
          <option value="Кофе">Кофе</option>
          <option value="Авторское">Авторское</option>
          <option value="Напитки">Напитки</option>
          <option value="Выпечка">Выпечка</option>
          <option value="Десерты">Десерты</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-coffee mb-1">Цена (₽)</label>
        <input type="number" name="price" required className="w-full px-3 py-2 rounded-lg border border-latte/30 outline-none focus:border-terracotta" />
      </div>
      <div>
        <label className="block text-sm text-coffee mb-1">Ссылка на фото (URL)</label>
        <input name="image_url" type="url" placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-latte/30 outline-none focus:border-terracotta" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-coffee mb-1">Описание</label>
        <textarea name="description" rows={2} className="w-full px-3 py-2 rounded-lg border border-latte/30 outline-none focus:border-terracotta resize-none"></textarea>
      </div>
      <button type="submit" disabled={isPending} className="md:col-span-2 py-3 bg-terracotta text-white rounded-xl font-medium hover:bg-coffee transition-colors disabled:opacity-50">
        {isPending ? 'Добавление...' : 'Добавить позицию'}
      </button>
    </form>
  )
}