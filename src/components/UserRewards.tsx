"use client";

import { Address } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import abi from "../../contract_abis/WethReward.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { useEffect } from "react";

export default function UserRewards() {
  const {
    status: claimStatus,
    data: rewardHash,
    isPending: claimPending,
    writeContract: claimRewards,
  } = useWriteContract();

  const { address } = useAccount();

  const { data: rewards } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["REWARDS"] as Address,
    functionName: "getRewardDataOfUsers",
    args: [address],
  }) as { data: bigint[] | undefined };

  const handleClaim = () => {
    try {
      claimRewards({
        abi: abi,
        address: CONTRACT_ADDRESSES["REWARDS"] as Address,
        functionName: "takeRewardBasedOnShoeId",
        args: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(rewards);
  }, [rewards]);

  return (
    <>
      <div className="flex flex-row w-full justify-evenly items-center">
        <div className="flex flex-col text-center space-y-2 rounded-full bg-[#FFD449] border-2 border-white h-[250px] w-[250px] justify-center items-center text-black">
          <p className="text-xl">Total rewards</p>
          <div className="border h-0 border-[#FF007A] w-32 mx-auto shadow-sm shadow-[#FF007A]"></div>
          <p className="text-xl">{rewards ? Number(rewards) : "0"} WETH</p>
        </div>
        <div className="flex flex-col text-center space-y-2 rounded-full bg-[#FF007A] border-2 border-black h-[250px] w-[250px] justify-center items-center">
          <p className="text-xl">Claim rewards</p>
          <div className="border h-0 border-[#FFD449] w-32 mx-auto shadow-sm shadow-[#FFD449]"></div>
          <p className="text-xl">{rewards ? Number(rewards) : "0"} WETH</p>
        </div>
      </div>
      <button
        className="border-[6px] border-[#FF007A] bg-[#D9D9D9] text-2xl text-black rounded-full py-1 px-3"
        onClick={handleClaim}
      >
        CLAIM REWARDS
      </button>
    </>
  );
}
