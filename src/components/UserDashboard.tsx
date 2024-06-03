"use client";

import FitnessData from "@/components/FitnessData";
import Link from "next/link";
import { useState } from "react";
import RedeemModal from "./RedeemModal";
import ShoeCollection from "./ShoeCollection";
import Image from "next/image";

export default function UserDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState("");
  const [steps, setSteps] = useState(0);

  return (
    <div className="flex flex-row justify-evenly w-full">
      <ShoeCollection setSelectedShoe={setSelectedShoe} />
      <div className="flex flex-col justify-end mb-[5vh] space-y-6">
        <p className="text-center">
          Selected shoe {selectedShoe ? Number(selectedShoe[0]) : ""}
        </p>
        <div className="h-[200px] w-[240px] relative border border-red-500 shadow-sm shadow-red-500 flex">
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
            <p className="mx-auto my-auto text-xs text-red-500">Shoe Preview</p>
          )}
        </div>
        <div>
          <p>Your Fitness Data from 1st May</p>
          <FitnessData steps={steps} setSteps={setSteps} />
        </div>
        <button
          className="actionButton"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Redeem steps
        </button>
        <Link href="/dashboard/rewards">
          <button className="actionButton">Check rewards</button>
        </Link>
      </div>
      <RedeemModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={selectedShoe}
        steps={steps}
      />
    </div>
  );
}
