'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addMenuItemAction(formData: FormData) {
  const supabase = await createClient()
  
  // Защита роута на уровне экшена
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Нет доступа' }
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { success: false, message: 'Требуются права администратора' }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const category = formData.get('category') as string
  const image_url = formData.get('image_url') as string

  const { error } = await supabase.from('menu_items').insert({
    name, description, price, category, image_url
  })

  if (error) return { success: false, message: 'Ошибка при добавлении позиции' }

  revalidatePath('/menu')
  revalidatePath('/admin')
  return { success: true, message: 'Позиция успешно добавлена!' }
}

export async function deleteMenuItemAction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  
  if (error) return { success: false, message: 'Ошибка при удалении' }
  
  revalidatePath('/menu')
  revalidatePath('/admin')
  return { success: true, message: 'Позиция удалена' }
}