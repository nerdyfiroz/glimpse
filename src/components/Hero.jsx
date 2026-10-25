import { useEffect, useState } from 'react'
import { config } from '../config.js'
import { connectWallet, hasWallet, mint, shortAddr } from '../wallet.js'
import { useAccount, useReveal } from '../hooks.js'

export default function Hero() {
  const ref = useReveal()
  const [account, setAccount] = useAccount()
  const [minted, setMinted] = useState(config.mintedSupply)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const remaining = config.maxSupply - minted
  const pct = Math.round((minted / config.maxSupply) * 100)

  // Placeholder: remaining supply would come from the contract in production.
  useEffect(() => {
    setMinted(config.mintedSupply)
  }, [])

  async function handleConnect() {
    setStatus('')
    try {
      const addr = await connectWallet()
      setAccount(addr)
    } catch (e) {
      setStatus(e.message)
    }
  }

  async function handleMint() {
    if (!account) return setStatus('Connect your wallet first.')
    setBusy(true)
    setStatus('')
    try {
      const res = await mint({ account, quantity: 1 })
      setMinted((m) => m + 1)
      setStatus(
        res.demo
          ? `Demo mint simulated (nothing sent). Fake tx ${res.hash}`
          : `Mint submitted. Tx ${res.hash}`,
      )
    } catch (e) {
      setStatus(e.message || 'Mint failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex items-center">
      <div
        className="absolute inset-0 animate-gradient bg-[length:200%_200%] opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(120deg, #3b0764, #0c4a6e, #134e4a, #581c87, #0c4a6e)',
        }}
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <p className="text-accent2 tracking-[0.3em] text-xs sm:text-sm uppercase mb-4">
          Genesis collection
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight animate-float">
          {config.collectionName}
        </h1>
        <p className="mt-6 text-zinc-300 max-w-xl mx-auto text-base sm:text-lg">{config.tagline}</p>

        <div className="mt-10 mx-auto max-w-md rounded-2xl border border-white/10 bg-panel/70 backdrop-blur p-6">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>Mint price</span>
            <span className="text-white font-semibold">{config.mintPriceEth} ETH</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
            <span>Remaining</span>
            <span className="text-white font-semibold">
              {remaining.toLocaleString()} / {config.maxSupply.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent2 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {account ? (
              <button
                onClick={handleMint}
                disabled={busy}
                className="w-full rounded-xl bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-bold text-black transition hover:scale-[1.02] disabled:opacity-60"
              >
                {busy ? 'Minting...' : `Mint 1 for ${config.mintPriceEth} ETH`}
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="w-full rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                {hasWallet() ? 'Connect MetaMask' : 'Install MetaMask to connect'}
              </button>
            )}
            {account && (
              <p className="text-xs text-zinc-500">
                Connected as {shortAddr(account)}
                {config.demoMode && ' (demo mode, no real transaction)'}
              </p>
            )}
            {status && <p className="text-xs text-zinc-300 break-all">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
