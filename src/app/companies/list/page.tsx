"use client";

import ImageUpload from "@/components/ImageUpload";
import PrettyInput from "@/ui/PrettyInput";
import { useWriteContract, useAccount } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../../../contract_abis/MarketPlace.json";
import { Address } from "viem";
import { useState } from "react";
import { ethers } from "ethers";
import TxPopup from "@/components/TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function List() {
  const [cid, setCid] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [factor, setFactor] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const {
    status: listStatus,
    data: listHash,
    isPending: pendingList,
    writeContract: listItem,
  } = useWriteContract();

  const handleClick = () => {
    console.log("Listing an item...");
    try {
      listItem({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "list",
        args: [
          brand,
          name,
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`,
          ethers.parseEther(price.toString()),
          ethers.parseEther(factor.toString()),
          BigInt(quantity),
        ],
        value: ethers.parseEther(
          ((price / 10 + factor / 10) * quantity).toString()
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-evenly w-full">
        <ImageUpload cid={cid} setCid={setCid} />
        <div className="flex flex-col items-center justify-evenly">
          <PrettyInput
            type="text"
            name="Brand"
            label="Shoe Brand"
            input={brand}
            setInput={setBrand}
            min={0}
            max={0}
          />
          <PrettyInput
            type="text"
            name="Name"
            label="Shoe Name"
            input={name}
            setInput={setName}
            min={0}
            max={0}
          />
          <PrettyInput
            type="number"
            name="Price"
            label="Product Price"
            input={price}
            setInput={setPrice}
            min={0}
            max={0}
          />
          <PrettyInput
            type="number"
            name="factor"
            label="Reward factor"
            input={factor}
            setInput={setFactor}
            min={0}
            max={0}
          />
          <PrettyInput
            type="number"
            name="Quantity"
            label="Shoe Quantity"
            input={quantity}
            setInput={setQuantity}
            min={1}
            max={0}
          />
        </div>
      </div>
      <p className="mt-7 text-black">
        Platform fee: {(price / 10 + factor / 10) * quantity}ETH
      </p>
      <button
        className="bg-[#EA5B46] text-white font-bold text-3xl w-[150px] h-[40px] rounded-3xl"
        onClick={handleClick}
      >
        {pendingList ? (
          <div className="flex justify-center items-center h-6 w-full">
            <CircleLoading />
          </div>
        ) : (
          "LIST"
        )}
      </button>
      <TxPopup hash={listHash} status={listStatus} />
    </>
  );
}
