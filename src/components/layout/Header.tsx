'use client'

import Link from 'next/link'
import { Coffee, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { User } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-latte/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Coffee className="w-8 h-8 text-terracotta group-hover:scale-110 transition-transform" />
            <span className="font-serif text-2xl font-bold tracking-wider text-coffee">
              BREW <span className="text-terracotta">&</span> BEAN
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/#about" className="text-coffee/80 hover:text-terracotta transition-colors font-medium">О нас</Link>
            <Link href="/menu" className="text-coffee/80 hover:text-terracotta transition-colors font-medium">Меню</Link>
            <Link href="/#reviews" className="text-coffee/80 hover:text-terracotta transition-colors font-medium">Отзывы</Link>
            <Link href="/booking" className="px-6 py-2.5 bg-coffee text-cream rounded-full hover:bg-terracotta transition-colors font-medium">
              Бронь стола
            </Link>
            <Link href="/login" className="text-coffee/80 hover:text-terracotta transition-colors font-medium">Войти</Link>
          </nav>

          <button className="md:hidden p-2 text-coffee" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-cream border-b border-latte/20 py-4 px-4 flex flex-col gap-4 shadow-lg">
          <Link href="/#about" className="block text-lg text-coffee" onClick={() => setIsMenuOpen(false)}>О нас</Link>
          <Link href="/menu" className="block text-lg text-coffee" onClick={() => setIsMenuOpen(false)}>Меню</Link>
          <Link href="/booking" className="block text-center mt-2 px-6 py-3 bg-coffee text-cream rounded-xl" onClick={() => setIsMenuOpen(false)}>Бронь стола</Link>
          <Link href="/account" className="flex items-center gap-2 hover:text-terracotta transition-colors">
            <User className="w-5 h-5"/>
            <span className="md:hidden">Личный кабинет</span>
          </Link>
        </div>
      )}
    </header>
  )
}