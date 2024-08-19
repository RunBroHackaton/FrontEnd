"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import abi from "../../contract_abis/WethReward.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import { useSession } from "next-auth/react";
import CircleLoading from "@/ui/CircleLoading";
import abiSteps from "../../contract_abis/GetStepsAPI.json";

export default function RedeemModal({
  item,
  showModal,
  setShowModal,
  steps,
}: {
  steps: any;
  item: any;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}) {
  const close = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal") {
      setShowModal(false);
    }
  };

  const [fetchedSteps, setFetchedSteps] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const { data: session } = useSession();
  const { address } = useAccount();

  const {
    status: redeemStatus,
    data: redeemHash,
    isPending: redeemPending,
    writeContract: redeemSteps,
  } = useWriteContract();

  const {
    status: confirmStatus,
    data: confirmHash,
    isPending: confirmPending,
    writeContract: confirm,
  } = useWriteContract();

  const handleClick = () => {
    if (!fetchedSteps) {
      console.log("Fetching steps!");
      try {
        console.log("redeeming steps...");
        console.log(session?.accessToken);
        redeemSteps({
          abi: abiSteps,
          address: CONTRACT_ADDRESSES["STEPSAPI"] as Address,
          functionName: "sendRequest",
          args: [[""], session?.accessToken],
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("confirming steps...");
        confirm({
          abi: abi,
          address: CONTRACT_ADDRESSES["REWARDS"] as Address,
          functionName: "recordFetchedSteps",
          args: [address],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTimeLeft = () => {
    // Get the current date and time in UTC
    let now = new Date();

    // Calculate the next 12:00 AM UTC (start of the next day)
    let next12AM = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    );

    // Calculate the difference in milliseconds between now and the next 12:00 AM UTC
    let timeDifference = next12AM.getTime() - now.getTime();

    // Convert the time difference to minutes and hours
    let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    let hours = Math.floor(timeDifference / (1000 * 60 * 60));

    // Return the remaining time in hours and minutes
    return `${hours} hours and ${minutes} minutes`;
  };

  useEffect(() => {
    if (redeemStatus === "success") {
      setFetchingData(true);
      setTimeout(() => {
        setFetchedSteps(true);
        setFetchingData(false);
      }, 90000);
    }
  }, [redeemStatus]);

  return (
    <>
      {showModal ? (
        <div
          id="modal"
          className="fixed inset-0 bg-opacity backdrop-blur-sm flex justify-center items-center"
          onClick={close}
        >
          <div className="relative w-[500px] h-[500px] flex flex-col p-5 rounded-full  justify-evenly items-center bg-[#6E94EBBF] border-4 border-[#E4EBFA]">
            <p className="text-4xl font-black w-[320px] text-center">
              Reedem yesterday's steps!
            </p>
            <div>
              <p className="text-2xl text-center">Time Left!</p>
              <p className="text-2xl">{getTimeLeft()}</p>
            </div>
            <p className="text-2xl">
              Factor: {item[5] ? Number(item[5]) / 10 ** 18 : "0"}
            </p>
            <p className="text-2xl">Steps: {steps ? steps : "0"}</p>
            <div className="space-y-4 flex flex-col items-center justify-center">
              <p className="h-6 text-red-500 text-center">
                {fetchingData
                  ? "Dont close the window, still fetching data..."
                  : ""}
              </p>
              <button
                className="bg-[#EA5B46] h-[50px] w-[200px] rounded-2xl text-2xl"
                onClick={handleClick}
              >
                {redeemPending || confirmPending || fetchingData ? (
                  <div className="flex justify-center items-center h-6 w-full">
                    <CircleLoading />
                  </div>
                ) : fetchedSteps ? (
                  "CONFIRM"
                ) : (
                  "REDEEM STEPS"
                )}
              </button>
            </div>
            <div
              className="absolute right-3 top-0 text-white text-2xl cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            >
              x
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <TxPopup hash={redeemHash} status={redeemStatus} />
      <TxPopup hash={confirmHash} status={confirmStatus} />
    </>
  );
}
