// Edit this file to point the site at your real collection.
// Everything here is a PLACEHOLDER until you replace it.
export const config = {
  collectionName: 'Glimpse',
  tagline: 'A placeholder collection of 10,000 generative characters on Ethereum.',
  // Placeholder mint contract. Replace with your deployed contract address.
  contractAddress: '0x000000000000000000000000000000000000dEaD',
  chainId: 1, // 1 = Ethereum mainnet, 11155111 = Sepolia testnet
  chainName: 'Ethereum Mainnet',
  mintPriceEth: '0.08',
  maxSupply: 10000,
  // Placeholder: already-minted count. Replace with an on-chain read later.
  mintedSupply: 6412,
  // Safe demo mode: when true, mint() only simulates the transaction and never sends anything.
  demoMode: true,
  links: {
    discord: 'https://discord.com/',
    x: 'https://x.com/',
    opensea: 'https://opensea.io/',
  },
}
