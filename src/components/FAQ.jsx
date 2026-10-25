import { useState } from 'react'
import { faqs } from '../data.js'
import { useReveal } from '../hooks.js'

export default function FAQ() {
  const ref = useReveal()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div ref={ref}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center">FAQ</h2>
        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="rounded-xl border border-white/10 bg-panel">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
                >
                  {item.q}
                  <span className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <p className="overflow-hidden px-5 pb-4 text-sm text-zinc-300">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
