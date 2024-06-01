"use client";
import PrettyInput from "@/ui/PrettyInput";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import {
  useConnect,
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import abi from "../../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "@/components/TxPopup";

export default function Companies() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [KYC, setKYC] = useState("");
  const [creditNumber, setCreditNumber] = useState(0);
  const [checkingIfRegistered, setCheckingIfRegistered] = useState(false);

  const router = useRouter();

  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const { data: isRegistered } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    args: [address],
    functionName: "s_IsSellerRegistred",
  });

  const {
    status: registerStatus,
    data: registerHash,
    isPending: registerPending,
    writeContract: registerWallet,
  } = useWriteContract();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registerWallet({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "SellerRegisteration",
        args: [BigInt(creditNumber)],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = () => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: injected() });
    }
    setCheckingIfRegistered(true);
    setTimeout(() => {
      setCheckingIfRegistered(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("is registered", isRegistered);
    if (isRegistered) {
      router.push("/companies/list");
    }
  }, [isRegistered]);

  return (
    <>
      {isConnected && !isRegistered && !checkingIfRegistered ? (
        <form
          className="flex-1 flex justify-center items-center flex-col space-y-8"
          onSubmit={handleSubmit}
        >
          <p className="text-red-500 text-lg">
            Wallet hasn't been yet registered!
          </p>
          <p>Enter your company Details</p>
          <PrettyInput
            type="text"
            name="Name"
            label="Company Name"
            min={0}
            max={0}
            input={name}
            setInput={setName}
          />
          <PrettyInput
            type="text"
            name="Location"
            label="Company Location"
            min={0}
            max={0}
            input={location}
            setInput={setLocation}
          />
          <PrettyInput
            type="text"
            name="KYC"
            label="Company Details"
            min={0}
            max={0}
            input={KYC}
            setInput={setKYC}
          />
          <PrettyInput
            type="number"
            name="CreditNumber"
            label="Credit Number"
            min={0}
            max={0}
            input={creditNumber}
            setInput={setCreditNumber}
          />
          <input
            type="submit"
            value={registerPending ? "REGISTERING..." : "REGISTER"}
            className="actionButton mt-10 cursor-pointer"
          />
        </form>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <button
            className="actionButton"
            onClick={connectWallet}
            disabled={checkingIfRegistered}
          >
            {checkingIfRegistered ? "CONNECTING..." : "CONNECT WALLET"}
          </button>
        </div>
      )}
      <TxPopup hash={registerHash} status={registerStatus} />
    </>
  );
}
