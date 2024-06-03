"use client";

import { useWriteContract } from "wagmi";
import Convert from "./Convert";

export default function UserRewards() {
  const {
    status: claimStatus,
    data: rewardHash,
    isPending: claimPending,
    writeContract: claimRewards,
  } = useWriteContract();

  const handleClaim = () => {
    try {
      // claimRewards({
      // })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-evenly items-center">
        <div className="flex flex-col text-center space-y-2">
          <p className="text-lg">Total rewards</p>
          <div className="border h-0 border-red-500 w-32 mx-auto shadow-sm shadow-red-500"></div>
          <p className="text-3xl">0 RB</p>
        </div>
        <div className="flex flex-col text-center space-y-2">
          <p className="text-lg">Claim rewards</p>
          <div className="border h-0 border-red-500 w-32 mx-auto shadow-sm shadow-red-500"></div>
          <p className="text-3xl">0 RB</p>
        </div>
      </div>
      <button className="actionButton">CLAIM REWARDS</button>
      <Convert />
    </>
  );
}
