"use client";

import PrettyInput from "@/ui/PrettyInput";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import abi from "../../../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "@/components/TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function Shipping() {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const {
    status: shippingStatus,
    data: shippingHash,
    isPending: shippingPending,
    writeContract: updateShipping,
  } = useWriteContract();

  const handleSubmit = () => {
    try {
      updateShipping({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "setUserHomeAddress",
        args: [
          `Address: ${address}; postalCode: ${postalCode}; city: ${city}; country: ${country}`,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="text-black flex-1 flex flex-col items-center px-16 py-10 justify-evenly bg-[#E4EBFA] w-10/12 h-[70vh] ml-3 rounded-3xl">
      <div className="text-3xl h-[20%] flex justify-center items-center font-black">
        Shipping Address
      </div>
      <div className="text-xl h-[60%] flex flex-col justify-evenly items-center">
        <PrettyInput
          type="string"
          name="Address"
          label="Address"
          min={0}
          max={0}
          input={address}
          setInput={setAddress}
        />
        <PrettyInput
          type="number"
          name="postalCode"
          label="Postal Code"
          min={0}
          max={0}
          input={postalCode}
          setInput={setPostalCode}
        />
        <PrettyInput
          type="string"
          name="city"
          label="City/Region"
          min={0}
          max={0}
          input={city}
          setInput={setCity}
        />
        <PrettyInput
          type="string"
          name="country"
          label="Country"
          min={0}
          max={0}
          input={country}
          setInput={setCountry}
        />
      </div>
      <div className="h-[20%] flex justify-center items-center">
        <input
          type="submit"
          value={"SUBMIT"}
          className="cursor-pointer text-xl border-cyan-800 bg-cyan-300 border h-[40px] w-[140px] rounded-xl transition-colors duration-500 hover:bg-cyan-200"
        />
      </div>
    </form>
  );
}
