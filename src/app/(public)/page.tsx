import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'

export const instant = false
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
    </div>
  )
}