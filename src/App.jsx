import Hero from './components/Hero.jsx'
import Gallery from './components/Gallery.jsx'
import Roadmap from './components/Roadmap.jsx'
import Team from './components/Team.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import { config } from './config.js'

const navItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
]

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-ink/60 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-black tracking-tight">{config.collectionName}</a>
          <nav className="hidden sm:flex gap-6 text-sm text-zinc-300">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white transition">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Gallery />
        <Roadmap />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
