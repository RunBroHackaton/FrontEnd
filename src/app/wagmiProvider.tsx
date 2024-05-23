"use client"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"

export default function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const config = getDefaultConfig({
      appName: 'Run Bro!',
      projectId: 'v1',
      chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
      ssr: true, // If your dApp uses server side rendering (SSR)
    });
    

    const queryClient = new QueryClient()

return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                {children}
              </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
) }