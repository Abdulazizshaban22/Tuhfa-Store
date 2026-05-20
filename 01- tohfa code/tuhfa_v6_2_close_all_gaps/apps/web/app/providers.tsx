
'use client'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygon } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || process.env.WALLETCONNECT_PROJECT_ID || ''
const networks = [polygon]
const wagmi = new WagmiAdapter({ networks, projectId, ssr:true })

createAppKit({
  adapters:[wagmi], networks, projectId,
  metadata:{ name:'Tuhfa', description:'Tuhfa Wallet Integration', url:process.env.NEXT_PUBLIC_APP_URL||'', icons:['/icon.png'] }
})

export default function Providers({children}:{children:React.ReactNode}){
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
