"use client";

import ImageUpload from "@/components/ImageUpload";
import PrettyInput from "@/ui/PrettyInput";
import { useWriteContract } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../../../contract_abis/MarketPlace.json";
import { Address } from "viem";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TxPopup from "@/components/TxPopup";
import CircleLoading from "@/ui/CircleLoading";
import ItemModal from "@/components/ItemModal";

export default function List() {
  const [cid, setCid] = useState("");
  const [price, setPrice] = useState(0);
  const [reward, setReward] = useState(0);
  const [steps, setSteps] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const {
    status: listStatus,
    data: listHash,
    isPending: pendingList,
    writeContract: listItem,
  } = useWriteContract();

  const handleClick = () => {
    console.log("Listing an item...");
    console.log(
      "Nike",
      "Terminal",
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`,
      ethers.parseEther(price.toString()),
      ethers.parseEther((reward / steps).toString()),
      ethers.parseEther(quantity.toString())
    );
    console.log(abi);
    console.log(CONTRACT_ADDRESSES["MARKETPLACE"]);
    try {
      listItem({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "list",
        args: [
          "Nike",
          "Terminal",
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`,
          BigInt(price),
          BigInt("1"),
          BigInt(quantity),
        ],
        value: ethers.parseEther("0.01"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(listStatus);
  }, [listStatus]);

  return (
    <>
      <div className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly">
        <p className="text-center">List items</p>
        <div className="flex flex-row justify-evenly w-full">
          <ImageUpload cid={cid} setCid={setCid} />
          <div className="flex flex-col items-center justify-center space-y-12">
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
              name="Reward"
              label="Reward In RB"
              input={reward}
              setInput={setReward}
              min={0}
              max={0}
            />
            <PrettyInput
              type="number"
              name="Steps"
              label="Steps Achieved"
              input={steps}
              setInput={setSteps}
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
        <p className="mt-7">Platform fee: 10%</p>
        <button className="actionButton" onClick={handleClick}>
          {pendingList ? (
            <div className="h-5 flex justify-center items-center w-5 mx-auto">
              <CircleLoading />
            </div>
          ) : (
            "LIST"
          )}
        </button>
      </div>
      <TxPopup hash={listHash} status={listStatus} />
    </>
  );
}
