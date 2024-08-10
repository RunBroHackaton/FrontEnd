"use client";

import FitnessData from "@/components/FitnessData";
import RedeemModal from "@/components/RedeemModal";
import ShoeCollection from "@/components/ShoeCollection";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Collection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState("");
  const [steps, setSteps] = useState(0);

  const { data: session } = useSession();

  return (
    <div className="flex flex-row items-center w-full justify-between pl-3 pr-16">
      <ShoeCollection setSelectedShoe={setSelectedShoe} />
      {selectedShoe ? (
        <div className="flex flex-col justify-center items-center rounded-full bg-[#D9D9D9] h-[400px] w-[400px]">
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
              <p className="mx-auto my-auto text-xs text-black">Shoe Preview</p>
            )}
          </div>
          <div className="text-black">
            <p>Your Fitness Data from 1st May</p>
            <FitnessData steps={steps} setSteps={setSteps} />
          </div>
          <button
            className="bg-[#E4EBFA] border-[8px] border-[#FF007A] rounded-3xl text-black px-4 py-1 text-2xl"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Redeem steps
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
      <RedeemModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={selectedShoe}
        steps={steps}
      />
    </div>
  );
}
