import { createClient } from '@/lib/supabase/server'
import { Coffee } from 'lucide-react'

export const metadata = {
  title: 'Мой профиль | BREW & BEAN',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Получаем данные профиля из БД
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <h1 className="text-3xl font-serif text-coffee mb-8">
        Добро пожаловать, {profile?.full_name || 'Гость'}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-latte/10 rounded-2xl border border-latte/20">
          <p className="text-sm text-coffee/70 mb-2 font-medium">Ваш Email</p>
          <p className="font-serif text-xl text-coffee">{profile?.email}</p>
        </div>
        
        <div className="p-6 bg-terracotta/10 rounded-2xl border border-terracotta/20 flex items-center justify-between">
          <div>
            <p className="text-sm text-terracotta/80 mb-2 font-medium">Баллы лояльности</p>
            <p className="font-bold text-terracotta text-4xl">{profile?.loyalty_points || 0}</p>
          </div>
          <Coffee className="w-16 h-16 text-terracotta/30" />
        </div>
      </div>
    </div>
  )
}