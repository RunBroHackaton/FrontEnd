"use client";

import FitnessData from "@/components/FitnessData";
import Link from "next/link";
import { useState } from "react";
import RedeemModal from "./RedeemModal";
import ShoeCollection from "./ShoeCollection";

export default function UserDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState("");

  return (
    <div className="flex flex-row space-x-[10vw]">
      <ShoeCollection setSelectedShoe={setSelectedShoe} />
      <div className="flex flex-col justify-end mb-[5vh] space-y-6">
        <div>
          <p>Your Fitness Data from 1st May</p>
          <FitnessData />
        </div>
        <Link href="/dashboard/rewards">
          <button className="actionButton">Check rewards</button>
        </Link>
        <button
          className="actionButton"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Redeem steps
        </button>
      </div>
      <RedeemModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={selectedShoe}
      />
    </div>
  );
}
