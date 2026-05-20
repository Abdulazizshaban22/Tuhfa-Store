
'use client';
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, polygon, optimism } from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// Configure Wagmi via AppKit adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, polygon, arbitrum, optimism],
  projectId
});

// Create AppKit (registers modal + web components like <appkit-button/>)
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  features: {
    email: true,
    socials: ['x', 'google', 'github']
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }:{children: React.ReactNode}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
