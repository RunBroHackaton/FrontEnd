"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import CircleLoading from "@/ui/CircleLoading";
import PrettyInput from "@/ui/PrettyInput";
import { ethers } from "ethers";

export default function Convert() {
  const [inputRB, setInputRB] = useState(0);

  const {
    status: convertStatus,
    data: convertHash,
    isPending: convertPending,
    writeContract: convertToWeth,
  } = useWriteContract();

  const handleConvert = () => {
    try {
      convertToWeth({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "",
        args: [ethers.parseEther(inputRB.toString())],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <p>Market</p>
        <p>1RB per {"10"}WETH</p>
      </div>
      <PrettyInput
        name="inputRB"
        type="number"
        label="Iput RB amount"
        input={inputRB}
        setInput={setInputRB}
        min={0}
        max={0}
      />
      <button className="actionButton" onClick={handleConvert}>
        CONVERT
      </button>
      <TxPopup hash={convertHash} status={convertStatus} />
    </>
  );
}
