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
import abi from "../../../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "@/components/TxPopup";

export default function Companies() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { address } = useAccount();

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

  const {
    status: detailsStatus,
    data: detailsHash,
    isPending: detailsPending,
    writeContract: addDetails,
  } = useWriteContract();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registerWallet({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "SellerRegisteration",
        args: [],
      });
      addDetails({
        abi: abi,
        address: CONTRACT_ADDRESSES["KYC"] as Address,
        functionName: "addDetails",
        args: [{ Brand: name, Decription: description }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("is registered", isRegistered);
    if (isRegistered) {
      console.log("Routing to list...");
      router.push("/companies/list");
    }
  }, [isRegistered]);

  return (
    <>
      {isRegistered ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-2xl text-blue-500">Wallet already registered!</p>
        </div>
      ) : (
        <form
          className="flex-1 flex justify-center items-center flex-col space-y-8"
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
            value={registerPending ? "REGISTERING..." : "REGISTER"}
            className="bg-blue-500 text-white h-[50px] w-[250px] cursor-pointer rounded-2xl hover:bg-blue-600"
          />
        </form>
      )}
      <TxPopup hash={registerHash} status={registerStatus} />
    </>
  );
}
