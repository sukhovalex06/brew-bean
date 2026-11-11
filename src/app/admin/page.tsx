import { createClient } from '@/lib/supabase/server'
import { AddMenuForm } from '@/components/forms/AddMenuForm'
import { DeleteMenuButton } from '@/components/forms/DeleteMenuButton'
import Image from 'next/image'

export const instant = false
export const metadata = { title: 'Управление меню | Админ' }

export default async function AdminMenuPage() {
  const supabase = await createClient()
  const { data: menuItems } = await supabase.from('menu_items').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-serif text-coffee mb-8">Управление меню</h1>
      
      <AddMenuForm />

      <h2 className="text-xl font-serif text-coffee mb-4">Текущие позиции</h2>
      <div className="space-y-4">
        {menuItems?.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border border-latte/20 rounded-xl hover:border-terracotta/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-latte/10 overflow-hidden shrink-0">
                <img src={item.image_url || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-coffee">{item.name}</p>
                <p className="text-sm text-coffee/60">{item.category} • {item.price} ₽</p>
              </div>
            </div>
            <DeleteMenuButton id={item.id} />
          </div>
        ))}
      </div>
    </div>
  )
}   