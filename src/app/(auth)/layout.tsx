import Link from 'next/link'
import { Coffee, ArrowLeft } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Минималистичная шапка с кнопкой "Назад" */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-coffee/70 hover:text-terracotta transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Вернуться на главную
        </Link>
      </header>

      {/* Центрированный контент */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Coffee className="w-10 h-10 text-terracotta group-hover:scale-110 transition-transform" />
              <span className="font-serif text-3xl font-bold tracking-wider text-coffee">
                BREW <span className="text-terracotta">&</span> BEAN
              </span>
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}