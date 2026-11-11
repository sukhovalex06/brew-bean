import Link from 'next/link'
import { Coffee, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-coffee text-cream py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-terracotta" />
              <span className="font-serif text-xl font-bold tracking-wider">
                BREW & BEAN
              </span>
            </Link>
            <p className="text-cream/70 max-w-xs">
              Место, где варится правильный кофе и рождаются лучшие идеи.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-terracotta">Контакты</h4>
            <div className="space-y-2 text-cream/80">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> г. Москва, ул. Кофейная, 1</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +7 (999) 123-45-67</p>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/20 mt-12 pt-8 text-center text-sm text-cream/50">
          © 2026 BREW & BEAN. Все права защищены.
        </div>
      </div>
    </footer>
  )
}