import { config } from './config.js'

// Wallet + mint helpers. Demo mode (config.demoMode = true) never sends a transaction.

export function hasWallet() {
  return typeof window !== 'undefined' && !!window.ethereum
}

export async function connectWallet() {
  if (!hasWallet()) throw new Error('MetaMask not detected. Install MetaMask to connect.')
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  await ensureChain()
  return accounts[0]
}

async function ensureChain() {
  const chainHex = '0x' + config.chainId.toString(16)
  const current = await window.ethereum.request({ method: 'eth_chainId' })
  if (current === chainHex) return
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainHex }],
  })
}

// Convert a decimal ETH string (e.g. "0.08") to a hex wei value without float error.
export function ethToWeiHex(eth) {
  const [whole, frac = ''] = String(eth).split('.')
  const wei = BigInt(whole || '0') * 10n ** 18n + BigInt((frac + '0'.repeat(18)).slice(0, 18))
  return '0x' + wei.toString(16)
}

export async function mint({ account, quantity = 1 }) {
  const valueWei = ethToWeiHex(config.mintPriceEth)
  const totalValue = BigInt(valueWei) * BigInt(quantity)

  if (config.demoMode) {
    // Simulated only. Nothing is sent to the chain.
    await new Promise((r) => setTimeout(r, 1200))
    return {
      demo: true,
      hash: '0xDEMO' + Math.random().toString(16).slice(2, 12).padEnd(10, '0'),
      value: totalValue.toString(),
    }
  }

  if (!hasWallet()) throw new Error('No wallet detected.')
  await ensureChain()
  const hash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: account,
        to: config.contractAddress,
        value: '0x' + totalValue.toString(16),
        // Placeholder calldata. Replace with your contract's mint(uint256) encoding.
        data: '0x',
      },
    ],
  })
  return { demo: false, hash, value: totalValue.toString() }
}

export function shortAddr(addr) {
  return addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : ''
}
