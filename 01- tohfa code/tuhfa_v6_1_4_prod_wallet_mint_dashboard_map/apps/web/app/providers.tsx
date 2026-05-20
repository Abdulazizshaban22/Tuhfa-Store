'use client'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { polygon } from '@reown/appkit/networks'

const queryClient = new QueryClient()
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || process.env.WALLETCONNECT_PROJECT_ID || ''

const networks = [polygon] // you may extend with custom zkEVM via viem if desired
const wagmiAdapter = new WagmiAdapter({ networks, projectId, ssr: true })

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Tuhfa',
    description: 'Tuhfa Wallet Integration',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173',
    icons: ['https://tuhfa.example/icon.png']
  }
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
