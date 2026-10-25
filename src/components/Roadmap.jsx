import { roadmap } from '../data.js'
import { useReveal } from '../hooks.js'

function RoadmapCard({ phase }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="relative pl-10 md:pl-0">
      <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-gradient-to-r from-accent to-accent2 md:left-1/2 md:-translate-x-1/2" />
      <div className="rounded-2xl border border-white/10 bg-panel p-6">
        <p className="text-xs uppercase tracking-widest text-accent2">
          {phase.phase} · {phase.date}
        </p>
        <h3 className="mt-2 text-xl font-bold">{phase.title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc list-inside">
          {phase.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">Roadmap</h2>
      <div className="relative mt-14 space-y-10 md:space-y-14">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10 md:left-1/2" />
        {roadmap.map((phase) => (
          <RoadmapCard key={phase.phase} phase={phase} />
        ))}
      </div>
    </section>
  )
}
