"use client";
import PrettyInput from "@/ui/PrettyInput";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import abi from "../../../../contract_abis/MarketPlace.json";
import kycAbi from "../../../../contract_abis/KYC.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "@/components/TxPopup";

export default function Companies() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { address } = useAccount();

  const { data: isRegistered } = useReadContract({
    abi: kycAbi,
    address: CONTRACT_ADDRESSES["KYC"] as Address,
    args: [address],
    functionName: "checkIfSellerIsRegisteredOrNot",
  });

  const {
    status: detailsStatus,
    data: detailsHash,
    isPending: detailsPending,
    writeContract: addDetails,
  } = useWriteContract();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Submiting the form");
    e.preventDefault();
    try {
      addDetails({
        abi: kycAbi,
        address: CONTRACT_ADDRESSES["KYC"] as Address,
        functionName: "addDetails",
        args: [JSON.stringify({ Brand: name, Description: description })],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isRegistered ? (
        <p className="text-3xl text-blue-500">Wallet already registered!</p>
      ) : (
        <form
          className="flex-1 flex flex-col items-center px-16 justify-evenly rounded-md h-[70vh] mx-[2%] space-y-8 w-full"
          onSubmit={handleSubmit}
        >
          <p className="text-blue-500 text-3xl font-black">
            Wallet hasn't been yet registered!
          </p>
          <PrettyInput
            type="text"
            name="Name"
            label="Company Name"
            min={0}
            max={0}
            input={name}
            setInput={setName}
          />
          <textarea
            placeholder="DESCRIPTION"
            className="textarea-wrapper h-[400px] w-[600px]"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          <input
            type="submit"
            value={detailsPending ? "REGISTERING..." : "REGISTER"}
            className="bg-blue-500 text-white h-[50px] w-[250px] cursor-pointer rounded-2xl hover:bg-blue-600"
          />
        </form>
      )}
      <TxPopup hash={detailsHash} status={detailsStatus} />
    </>
  );
}
