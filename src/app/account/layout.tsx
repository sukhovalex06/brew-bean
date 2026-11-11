import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { User, Calendar, Heart, LogOut } from 'lucide-react'
import { logoutAction } from '@/actions/auth'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Боковое меню */}
        <aside className="w-full md:w-72 shrink-0">
          <nav className="flex flex-col gap-2 p-4 bg-white rounded-3xl shadow-sm border border-latte/10">
            <Link href="/account" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee transition-colors font-medium">
              <User className="w-5 h-5 text-terracotta" /> Профиль
            </Link>
            <Link href="/account/bookings" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee transition-colors font-medium">
              <Calendar className="w-5 h-5 text-terracotta" /> Мои брони
            </Link>
            <Link href="/account/favorites" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee transition-colors font-medium">
              <Heart className="w-5 h-5 text-terracotta" /> Избранное
            </Link>
            
            <div className="h-px bg-latte/20 my-2"></div>
            
            <Link href="/account/favorites" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee transition-colors font-medium">
              <Heart className="w-5 h-5 text-terracotta" /> Избранное
            </Link>
            
            {/* Добавляем ссылку на админку */}
            <div className="h-px bg-latte/20 my-2"></div>
            <Link href="/admin" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-terracotta/10 text-terracotta transition-colors font-bold">
              Панель администратора
            </Link>
            
            <div className="h-px bg-latte/20 my-2"></div>
            
            <form action={logoutAction}>
              
            </form>
            <form action={logoutAction}>
              <button type="submit" className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 text-red-600 transition-colors font-medium text-left">
                <LogOut className="w-5 h-5" /> Выйти
              </button>
            </form>
          </nav>
        </aside>

        {/* Основной контент */}
        <main className="flex-grow bg-white p-8 rounded-3xl shadow-sm border border-latte/10">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  )
}