import { useEffect, useRef, useState } from 'react'

// Adds the .in-view class once an element scrolls into view (scroll reveal animation).
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          obs.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    el.classList.add('reveal')
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// Small hook that keeps wallet account in sync with MetaMask account changes.
export function useAccount() {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    if (!window.ethereum) return
    const onChange = (accounts) => setAccount(accounts[0] || null)
    window.ethereum.request({ method: 'eth_accounts' }).then((a) => setAccount(a[0] || null)).catch(() => {})
    window.ethereum.on?.('accountsChanged', onChange)
    return () => window.ethereum.removeListener?.('accountsChanged', onChange)
  }, [])
  return [account, setAccount]
}
