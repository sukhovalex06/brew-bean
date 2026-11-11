import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Coffee, CalendarCheck, Settings, LogOut } from 'lucide-react'
import { logoutAction } from '@/actions/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 shrink-0">
          <nav className="flex flex-col gap-2 p-4 bg-white rounded-3xl shadow-sm border border-latte/10">
            <div className="p-4 mb-2 bg-coffee text-cream rounded-2xl">
              <p className="font-serif text-lg">Панель управления</p>
              <p className="text-sm opacity-70">Режим администратора</p>
            </div>
            
            <Link href="/admin" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee font-medium">
              <Coffee className="w-5 h-5 text-terracotta" /> Управление меню
            </Link>
            <Link href="/admin/bookings" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-latte/10 text-coffee font-medium">
              <CalendarCheck className="w-5 h-5 text-terracotta" /> Все бронирования
            </Link>
            
            <div className="h-px bg-latte/20 my-2"></div>
            
            <form action={logoutAction}>
              <button type="submit" className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 text-red-600 font-medium text-left">
                <LogOut className="w-5 h-5" /> Выйти
              </button>
            </form>
          </nav>
        </aside>

        <main className="flex-grow bg-white p-8 rounded-3xl shadow-sm border border-latte/10">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}