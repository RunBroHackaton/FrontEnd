"use client";

import { MouseEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useReadContract, useWriteContract } from "wagmi";
import abi from "../../contract_abis/PoolModel2.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import CircleLoading from "@/ui/CircleLoading";
import PrettyInput from "@/ui/PrettyInput";
import { ethers } from "ethers";

export default function Convert() {
  const [inputRB, setInputRB] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

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
        address: CONTRACT_ADDRESSES["POOL"] as Address,
        functionName: "swap",
        args: [CONTRACT_ADDRESSES["RB"], ethers.parseEther(inputRB.toString())],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: wethReserve } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["POOL"] as Address,
    functionName: "s_wethReserve",
  });

  const { data: rbReserve } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["POOL"] as Address,
    functionName: "s_rbReserve",
  });

  useEffect(() => {
    console.log(wethReserve);
    console.log(rbReserve);
    if (wethReserve && rbReserve) {
      setConversionRate(Number(wethReserve) / Number(rbReserve));
    }
  }, [wethReserve, rbReserve]);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex flex-row space-x-1">
          <p>Market:</p>
          <p> 1RB per {conversionRate} WETH</p>
        </div>
        <PrettyInput
          name="inputRB"
          type="number"
          label="Input RB amount"
          input={inputRB}
          setInput={setInputRB}
          min={0}
          max={0}
        />
        <p>Estimated return: {inputRB * conversionRate} WETH</p>
        <button className="actionButton" onClick={handleConvert}>
          CONVERT
        </button>
      </div>
      <TxPopup hash={convertHash} status={convertStatus} />
    </>
  );
}
