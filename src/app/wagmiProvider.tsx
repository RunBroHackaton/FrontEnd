"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { createConfig, http } from "wagmi";
import { RainbowKitProvider, darkTheme, Theme } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [rainbowWallet, coinbaseWallet, metaMaskWallet, trustWallet],
      },
    ],
    {
      appName: "RunBro",
      projectId: "2ba9dd02bf6fec560f472052988290b7",
    }
  );

  const config = createConfig({
    connectors,
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "black",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "rounded",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
