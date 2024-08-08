"use client";

import { MouseEvent, useEffect } from "react";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function BuyButton({ item }: { item: any }) {
  const {
    status: buyStatus,
    data: buyHash,
    isPending: buyPending,
    writeContract: buyShoe,
  } = useWriteContract();

  const handleBuy = () => {
    try {
      buyShoe({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "buy",
        args: [item[0]],
        value: item[4],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="text-2xl w-[180px] mx-auto h-[40px] border-black border-2 rounded-xl bg-green-400 flex justify-center items-center hover:bg-green-500 transition-all duration-300"
        onClick={handleBuy}
        disabled={buyPending}
      >
        {buyPending ? (
          <div className="flex justify-center items-center h-6 w-full">
            <CircleLoading />
          </div>
        ) : (
          "BUY ITEM"
        )}
      </button>
      <TxPopup hash={buyHash} status={buyStatus} />
    </>
  );
}
