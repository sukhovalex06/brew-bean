import { Coffee, Leaf, Heart } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-coffee mb-6">Больше, чем просто кофейня</h2>
          <p className="text-coffee/80 text-lg">
            BREW & BEAN создавался как место силы. Мы привозим зерна с лучших плантаций мира, обжариваем их сами и варим кофе, который хочется пить каждый день.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-latte/10 text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-latte/20 rounded-full flex items-center justify-center mb-6 text-terracotta">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-coffee mb-4">Своя обжарка</h3>
            <p className="text-coffee/70">
              Контролируем процесс от зеленого зерна до чашки, раскрывая уникальный профиль каждого сорта.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-sm border border-latte/10 text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-latte/20 rounded-full flex items-center justify-center mb-6 text-terracotta">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-coffee mb-4">Натуральные десерты</h3>
            <p className="text-coffee/70">
              Готовим выпечку каждое утро. Никаких искусственных добавок, только фермерское масло и любовь.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-sm border border-latte/10 text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-latte/20 rounded-full flex items-center justify-center mb-6 text-terracotta">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-coffee mb-4">Атмосфера</h3>
            <p className="text-coffee/70">
              Много воздуха, удобные кресла и правильная музыка. Идеально для работы, встреч и свиданий.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}