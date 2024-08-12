"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import abi from "../../contract_abis/Reward.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import { useSession } from "next-auth/react";
import CircleLoading from "@/ui/CircleLoading";
import abiSteps from "../../contract_abis/functions.json";

export default function VendorModal({
  showModal,
  handleCloseModal,
  item,
}: {
  showModal: boolean;
  handleCloseModal: () => void;
  item: { brand: string; description: string };
}) {
  const close = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal") {
      handleCloseModal();
    }
  };

  return (
    <>
      {showModal ? (
        <div
          id="modal"
          className="fixed inset-0 bg-opacity backdrop-blur-sm flex justify-center items-center"
          onClick={close}
        >
          <div className="relative w-[700px] h-[600px] flex flex-col p-5 rounded-lg items-center bg-[#324d54df] border-4 border-[#E4EBFA]">
            <div className="h-1/6 flex">
              <p className="text-4xl mx-auto my-auto bg-yellow-300 px-5 py-3 rounded-3xl text-black">
                {item.brand.toUpperCase()}
              </p>
            </div>
            <div className="h-5/6">
              <p className="text-2xl">{item.description}</p>
            </div>
            <div
              className="absolute right-3 top-0 text-white text-2xl cursor-pointer"
              onClick={() => {
                handleCloseModal();
              }}
            >
              x
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
