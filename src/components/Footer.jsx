import { config } from '../config.js'

export default function Footer() {
  const links = [
    { label: 'Discord', href: config.links.discord },
    { label: 'X', href: config.links.x },
    { label: 'OpenSea', href: config.links.opensea },
  ]
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} {config.collectionName}. Placeholder site.</p>
        <nav className="flex gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-accent2 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
