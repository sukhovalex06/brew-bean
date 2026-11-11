import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

export const instant = false
export const metadata = {
  title: 'Меню | BREW & BEAN',
  description: 'Познакомьтесь с нашим ассортиментом кофе, напитков и десертов.',
}

export default async function MenuPage() {
  const supabase = await createClient()

  // Получаем все позиции меню из базы данных
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .order('category')

  // Группируем элементы по категориям
  const groupedMenu = menuItems?.reduce((acc: Record<string, any[]>, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="py-20 bg-cream min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee mb-6">Наше Меню</h1>
          <p className="text-coffee/80 text-lg">
            Мы готовим кофе только на свежеобжаренном зерне класса спешелти и печем десерты каждое утро.
          </p>
        </div>

        {groupedMenu && Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category} className="mb-16 last:mb-0">
            <h2 className="text-3xl font-serif text-coffee mb-8 flex items-center gap-4">
              {category}
              <span className="flex-grow h-px bg-latte/30"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-latte/10 group hover:border-terracotta/40 transition-colors">
                  <div className="relative h-64 w-full bg-latte/10 overflow-hidden">
                    {/* Используем обычный тег img для простоты, так как картинки из внешних источников */}
                    <img 
                      src={item.image_url || '/placeholder.jpg'} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="text-xl font-serif font-bold text-coffee">{item.name}</h3>
                      <span className="text-lg font-semibold text-terracotta whitespace-nowrap">
                        {item.price} ₽
                      </span>
                    </div>
                    <p className="text-coffee/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}