import { BookingForm } from '@/components/forms/BookingForm'
import { Clock, MapPin, Phone } from 'lucide-react'

export const metadata = {
  title: 'Бронь стола | BREW & BEAN',
  description: 'Забронируйте столик в нашей кофейне.',
}

export default function BookingPage() {
  return (
    <div className="py-20 bg-cream min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee mb-4">Ждем вас в гости</h1>
          <p className="text-coffee/80 text-lg">Забронируйте столик заранее, чтобы мы подготовили всё к вашему визиту.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Контактная информация слева */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-latte/10">
              <h3 className="font-serif text-xl text-coffee mb-6">Информация</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-latte/20 rounded-full text-terracotta shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-coffee">Часы работы</p>
                    <p className="text-coffee/70 text-sm">Пн-Вс: 08:00 - 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-latte/20 rounded-full text-terracotta shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-coffee">Адрес</p>
                    <p className="text-coffee/70 text-sm">г. Москва, ул. Кофейная, 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-latte/20 rounded-full text-terracotta shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-coffee">Телефон</p>
                    <p className="text-coffee/70 text-sm">+7 (999) 123-45-67</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-coffee text-cream p-6 rounded-3xl">
              <h3 className="font-serif text-xl mb-2">Большая компания?</h3>
              <p className="text-cream/70 text-sm mb-4">
                Для бронирования мероприятий или стола более чем на 10 человек, пожалуйста, свяжитесь с нами по телефону.
              </p>
            </div>
          </div>

          {/* Форма справа */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>

        </div>
      </div>
    </div>
  )
}