"use client";

import { useWriteContract } from "wagmi";
import abi from "../../contract_abis/KYC.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Abi, Address } from "viem";
import TxPopup from "./TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function Proposal({
  proposalId,
  account,
  brand,
  description,
  handleShowModal,
}: {
  proposalId: BigInt;
  account: Address;
  brand: string;
  description: string;
  handleShowModal: ({
    account,
    brand,
    description,
  }: {
    account: Address;
    brand: string;
    description: string;
  }) => void;
}) {
  const {
    status: voteStatus,
    data: voteHash,
    isPending: votePending,
    writeContract: castVote,
  } = useWriteContract();

  const handleVote = (side: boolean) => {
    try {
      castVote({
        abi: abi,
        address: CONTRACT_ADDRESSES["KYC"] as Address,
        functionName: "castVote",
        args: [proposalId.toString(), side.toString()],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-[200px] w-[300px] text-black text-center border-gray-400 border rounded-xl drop-shadow-lg bg-cyan-100">
        <div className="h-2/6 flex flex-col items-center">
          <p className="text-xl">{brand}</p>
          <p className="text-sm">
            {account.substring(0, 20)}
            {"..."}
          </p>{" "}
        </div>
        <div className="h-2/6 px-[10%]">
          <p className="text-base text-center">
            {description.substring(0, 50)}
            {"..."}
          </p>
          <p
            className="text-blue-400 underline text-sm cursor-pointer"
            onClick={() => {
              handleShowModal({ account, brand, description });
            }}
          >
            Read more
          </p>
        </div>
        <div className="h-2/6 flex flex-row space-x-5 justify-center items-center w-full">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-xl transition-all duration-200 active:translate-y-1 active:scale-95"
            onClick={() => handleVote(false)}
          >
            NO
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-xl transition-all duration-200 active:translate-y-1 active:scale-95"
            onClick={() => handleVote(true)}
          >
            YES
          </button>
        </div>
      </div>
      <TxPopup hash={voteHash} status={voteStatus} />
    </>
  );
}
