import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import WagmiProvider from "./wagmiProvider";
import SessionProvider from "./sessionProvider";
import { lilita_one, signika, nunito, asap, acme, concert } from "@/ui/Fonts";

export const metadata: Metadata = {
  title: "RunBro",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lilita_one.variable} ${nunito.className} ${concert.variable}`}
      >
        <WagmiProvider>
          <SessionProvider>
            <main className="min-h-screen w-full flex flex-col bg-[#E4EBFA] text-white">
              <Header />
              {children}
            </main>
          </SessionProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
