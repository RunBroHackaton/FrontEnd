"use client";

import SellerNavBar from "@/components/SellerNavBar";
import abi from "../../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { useConnect, useAccount, useReadContract } from "wagmi";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { injected } from "wagmi/connectors";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  const path = usePathname();

  const { data: isRegistered } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    args: [address],
    functionName: "s_IsSellerRegistred",
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const connectWallet = () => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: injected() });
    }
  };

  useEffect(() => {
    if (hasMounted && isConnected) {
      console.log("is registered", isRegistered);
      if (!isRegistered) {
        console.log("Routing to register...");
      }
    }
  }, [isRegistered, isConnected, hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-row items-center">
      <SellerNavBar />
      {!isConnected ? (
        <div className="flex-1 flex justify-center items-center">
          <button
            className="bg-blue-500 text-white h-[50px] w-[250px] rounded-2xl hover:bg-blue-600"
            onClick={connectWallet}
          >
            CONNECT WALLET
          </button>
        </div>
      ) : isRegistered || path.includes("register") ? (
        <div className="flex-1 w-9/12">{children}</div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center space-y-5">
          <p className="text-2xl text-blue-500">
            Wallet not registered as a Vendor
          </p>
          <Link href="/companies/register">
            <div className="bg-blue-500 text-white h-[50px] w-[250px] rounded-2xl hover:bg-blue-600 text-3xl flex justify-center items-center">
              REGISTER
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
