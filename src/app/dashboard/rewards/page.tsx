"use client";

import ShoeCollection from "@/components/ShoeCollection";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import abi from "../../../../contract_abis/WethReward.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import TxPopup from "@/components/TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function Rewards() {
  const [selectedShoe, setSelectedShoe] = useState("");

  const { data: session } = useSession();

  function formatTimestampToDate(timestamp: number) {
    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Create a Date object from the timestamp
    let date = new Date(timestamp);

    // Extract the day and month name
    let day = date.getUTCDate();
    let monthName = monthNames[date.getUTCMonth()];

    // Return the formatted string
    console.log(`${day} ${monthName}`);
    return `${day} ${monthName}`;
  }

  const { address } = useAccount();

  const {
    status: claimStatus,
    data: rewardHash,
    isPending: claimPending,
    writeContract: claimRewards,
  } = useWriteContract();

  const { data: rewards } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["REWARDS"] as Address,
    functionName: "_calculateRewardOfUserSteps",
    args: [address, Number(selectedShoe[0])],
  }) as { data: bigint[] | undefined };

  const handleClaim = () => {
    console.log("Claiming");
    console.log(Number(selectedShoe[0]));
    try {
      claimRewards({
        abi: abi,
        address: CONTRACT_ADDRESSES["REWARDS"] as Address,
        functionName: "takeRewardBasedOnShoeId",
        args: [selectedShoe[0]],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between pl-3 pr-16 w-11/12">
        <ShoeCollection setSelectedShoe={setSelectedShoe} />
        {selectedShoe ? (
          <div className="flex flex-col justify-center items-center rounded-full bg-[#D9D9D9] h-[450px] w-[450px] space-y-5">
            <div className="h-[200px] w-[240px] relative border-4 border-[#E4EBFA] flex">
              {selectedShoe ? (
                <Image
                  loader={() =>
                    selectedShoe[3].includes(
                      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                    )
                      ? selectedShoe[3]
                      : "/placeHolderShoe.jpg"
                  }
                  src={
                    selectedShoe[3].includes(
                      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                    )
                      ? selectedShoe[3]
                      : "/placeHolderShoe.jpg"
                  }
                  fill
                  alt={`Shoe ${selectedShoe[0]} picture`}
                />
              ) : (
                <p className="mx-auto my-auto text-xs text-black">
                  Shoe Preview
                </p>
              )}
            </div>
            <div className="text-black text-lg text-center">
              <p>REWARDS AVAILABLE TO CLAIM:</p>
              <p>{rewards ? Number(rewards) / 10 ** 18 : "0"} WETH</p>
            </div>
            <button
              className="bg-[#E4EBFA] border-[8px] border-[#FF007A] rounded-3xl text-black w-[250px] h-[55px] text-2xl"
              onClick={handleClaim}
            >
              {claimPending ? (
                <div className="flex justify-center items-center h-6 w-full">
                  <CircleLoading />
                </div>
              ) : (
                "CLAIM REWARDS"
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start h-[70vh] flex-1">
            <p className="text-2xl ml-[20%] mt-[10%]">
              Welcome, {session?.user?.name}
            </p>
            <p className="text-3xl mx-auto mt-[15%] w-[400px]">
              Select shoes from your collection to redeem your Token Rewards!
            </p>
          </div>
        )}
      </div>
      <TxPopup status={claimStatus} hash={rewardHash} />
    </>
  );
}
