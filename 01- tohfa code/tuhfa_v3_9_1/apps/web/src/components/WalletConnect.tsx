'use client';
import { useEffect, useState } from 'react';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';

const projectId = process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID || process.env.NEXT_PUBLIC_WALLETCONNECT_ID || '';
const queryClient = new QueryClient();

const config = createConfig({
  chains: [polygonAmoy],
  transports: { [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc-amoy.polygon.technology') },
});

// Init AppKit (WalletConnect)
createAppKit({
  projectId,
  metadata: {
    name: 'Tuhfa',
    description: 'Tuhfa Marketplace',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    icons: ['https://walletconnect.com/walletconnect-logo.png']
  }
});

function Inner(){
  const [ready, setReady] = useState(false);
  useEffect(()=>{ setReady(true); },[]);
  if(!ready) return null;
  return (
    <div>
      <h3>المحافظ</h3>
      <p>اربط محفظتك لتجربة السك/الشراء داخل Amoy.</p>
      <w3m-button />
    </div>
  );
}

export default function WalletConnect(){
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Inner/>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
