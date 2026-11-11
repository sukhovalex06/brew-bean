import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-coffee">
      {/* Фоновый градиент (позже сюда можно добавить фоновое фото через next/image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee via-coffee to-terracotta/40 opacity-90 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-latte/20 text-latte text-sm font-medium mb-6 animate-fade-in-up">
          Открыты с 08:00 до 22:00
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream mb-6 leading-tight max-w-4xl mx-auto">
          Искусство идеального <span className="text-terracotta italic">кофе</span>
        </h1>
        <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-2xl mx-auto">
          Авторская обжарка, свежие десерты и атмосфера, в которой рождаются лучшие идеи.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/menu" 
            className="px-8 py-4 bg-terracotta text-white rounded-full hover:bg-white hover:text-coffee transition-all duration-300 font-medium flex items-center gap-2"
          >
            Смотреть меню <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/booking" 
            className="px-8 py-4 bg-transparent border border-cream text-cream rounded-full hover:bg-cream/10 transition-all duration-300 font-medium"
          >
            Забронировать стол
          </Link>
        </div>
      </div>
    </section>
  )
}