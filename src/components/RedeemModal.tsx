import { MouseEvent } from "react";
import { useWriteContract } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";

export default function RedeemModal({
  item,
  showModal,
  setShowModal,
}: {
  item: any;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}) {
  if (!showModal) return null;

  const close = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal") {
      setShowModal(false);
    }
  };

  const {
    status: redeemStatus,
    data: redeemHash,
    isPending: redeemPending,
    writeContract: redeemSteps,
  } = useWriteContract();

  const handleRedeem = () => {
    try {
      redeemSteps({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "",
        args: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeLeft = async (startOfDay: any) => {
    const endOfDay = Number(startOfDay) + 24 * 60 * 60;
    const currentTimeStamp = Math.round(Date.now() / 1000);
    const time = endOfDay - currentTimeStamp;
    const hoursLeft = Math.floor(time / 60 / 60);
    const minutesLeft = Math.floor(time / 60) % 24;
    return `${hoursLeft} H ${minutesLeft} min`;
  };

  return (
    <>
      <div
        id="modal"
        className="fixed inset-0 bg-opacity backdrop-blur-sm flex justify-center items-center"
        onClick={close}
      >
        <div className="relative w-[700px] h-[450px] flex flex-row p-5 rounded-lg bg-black justify-around items-center">
          <p>Time Left!</p>
          <p>Reedem yesterday's 100steps for RB</p>
          <button className="actionButton">
            {redeemPending ? "Redeeming..." : "REDEEM"}
          </button>
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
      <TxPopup hash={redeemHash} status={redeemStatus} />
    </>
  );
}
