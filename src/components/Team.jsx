import { team } from '../data.js'
import { useReveal } from '../hooks.js'

function MemberCard({ member }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-panel p-6 text-center">
      <img
        src={member.avatar}
        alt={member.name}
        className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-accent/50"
      />
      <h3 className="mt-4 font-bold">{member.name}</h3>
      <p className="text-sm text-zinc-400">{member.role}</p>
      <div className="mt-4 flex justify-center gap-4 text-sm text-accent2">
        <a href={member.social.x} target="_blank" rel="noreferrer" className="hover:underline">X</a>
        <a href={member.social.discord} target="_blank" rel="noreferrer" className="hover:underline">Discord</a>
        <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">Team</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </div>
    </section>
  )
}
