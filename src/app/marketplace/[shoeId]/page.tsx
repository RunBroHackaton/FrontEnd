"use client";

import { useReadContract } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import MARKETPLACE_ABI from "../../../../contract_abis/MarketPlace.json";
import { Address } from "viem";
import { useEffect, useState } from "react";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";

export default function ShoePage({ params }: { params: { shoeId: number } }) {
  console.log(params.shoeId);

  const [shoe, setShoe] = useState<any>();

  const { data: shoeAttributes } = useReadContract({
    abi: MARKETPLACE_ABI,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "s_shoes",
    args: [params.shoeId],
  });

  useEffect(() => {
    if (shoeAttributes) {
      console.log(shoeAttributes);
      setShoe(shoeAttributes);
    }
  }, [shoeAttributes]);

  const getWeth = (wei: string) => {
    return Number(wei) / 10 ** 18;
  };

  return (
    <>
      {shoe ? (
        <div className="flex flex-row flex-1 w-full justify-evenly items-center">
          <div className="">
            <Image
              src="/RB_Race_Track.png"
              alt="Race track image"
              height={200}
              width={200}
              className="inline-block float-start"
            />
            <div className="relative h-[450px] w-[630px] inline-block border-[10px] border-black">
              <Image
                loader={() =>
                  shoe[3].includes(
                    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                  )
                    ? shoe[3]
                    : "/placeHolderShoe.jpg"
                }
                src={
                  shoe[3].includes(
                    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                  )
                    ? shoe[3]
                    : "/placeHolderShoe.jpg"
                }
                alt="Image from IPFS"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col text-black justify-around h-[500px] py-[30px]">
            <p className="text-4xl">Product Details</p>
            <div className="text-3xl space-y-3">
              <p>ShoeId: {Number(shoe[0])}</p>
              <p>Brand: {shoe[1]}</p>
              <p>Name: {shoe[2]}</p>
              <p>Price: {getWeth(shoe[4])} WETH</p>
              <p>Power: {getWeth(shoe[5])}</p>
              <p>Quantity: {Number(shoe[6])}</p>
            </div>
            <BuyButton item={shoe} />
          </div>
        </div>
      ) : (
        <div>This shoe doesnt exist yet!</div>
      )}
    </>
  );
}

// 0: 6n
// ​
// 1: "Nike"
// ​
// 2: "Terminal"
// ​
// 3: "https://bronze-back-bobolink-497.mypinata.cloud/ipfs/QmdqHYEdMvez8SMrcfTQs2Ri1V3UbxWVfT8vD2Ci5MuRv1"
// ​
// 4: 10000000000000000n
// ​
// 5: 10000000000000000n
// ​
// 6: 2n
// ​
// 7: "0xd2fdd21AC3553Ac578a69a64F833788f2581BF05"
// ​
// length: 8
