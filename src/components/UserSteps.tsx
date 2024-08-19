"use client";

import { useState } from "react";
import FitnessData from "./FitnessData";
import RedeemModal from "./RedeemModal";

export default function UserSteps() {
  const [showModal, setShowModal] = useState(false);
  const [steps, setSteps] = useState(0);
  const [timestamp, setTimestamp] = useState();

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

  return (
    <>
      <div className="w-full flex flex-1 justify-around items-center flex-col text-black">
        <p className="text-lg w-[70%]">
          Each day the user can redeem their steps that they have taken one day
          before to be eligible for daily reward distribution. Users get the
          reward everyday that they fetched steps at 12:00 am UTC.
        </p>
        <p className="text-2xl">
          Your Fitness Data from{" "}
          {timestamp ? formatTimestampToDate(timestamp) : ""}
        </p>
        <FitnessData
          steps={steps}
          setSteps={setSteps}
          setTimestamp={setTimestamp}
        />
        <button
          className="border-[6px] border-[#FF007A] bg-[#D9D9D9] text-2xl rounded-full py-1 px-3"
          onClick={() => {
            setShowModal(true);
          }}
        >
          REDEEM STEPS
        </button>
      </div>
      <RedeemModal
        showModal={showModal}
        setShowModal={setShowModal}
        steps={steps}
      />
    </>
  );
}
