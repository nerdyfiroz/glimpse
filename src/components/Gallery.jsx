import { useEffect, useState } from 'react'
import { useReveal } from '../hooks.js'

export default function Gallery() {
  const ref = useReveal()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/metadata.json')
      .then((r) => {
        if (!r.ok) throw new Error('metadata.json not found')
        return r.json()
      })
      .then(setItems)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
      <div ref={ref}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center">Gallery</h2>
        <p className="mt-3 text-center text-zinc-400">Loaded from public/metadata.json</p>
        {error && <p className="mt-6 text-center text-red-400">{error}</p>}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((nft) => (
            <figure
              key={nft.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-panel transition hover:-translate-y-1 hover:border-accent/60"
            >
              <img
                src={nft.image}
                alt={nft.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="p-3">
                <p className="text-sm font-semibold truncate">{nft.name}</p>
                <p className="text-xs text-zinc-400 truncate">
                  {nft.attributes?.find((a) => a.trait_type === 'Rarity')?.value || ''}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
