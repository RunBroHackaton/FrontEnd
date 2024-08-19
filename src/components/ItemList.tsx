"use client";

import Item from "@/components/Item";
import { useBlockNumber, useReadContract, useReadContracts } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import MARKETPLACE_ABI from "../../contract_abis/MarketPlace.json";
import { Address, Abi } from "viem";
import { useEffect, useState } from "react";
import CircleLoading from "@/ui/CircleLoading";

export default function ItemList() {
  const [shoeList, setShoeList] = useState<any[] | null>([]);
  const [ethUsdPrice, setEthUsdPrice] = useState("");
  const [calledContract, setCalledContract] = useState<boolean>(false);

  const getShoeCountArray = () => {
    const end = Number(shoeCount);
    const start = 0;
    return Array.from({ length: end - start + 1 }, (v, k) => k + start);
  };

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: shoeCount } = useReadContract({
    abi: MARKETPLACE_ABI,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "s_shoeCount",
    blockNumber: blockNumber,
  });

  const { data: shoeMapping } = useReadContracts({
    contracts: getShoeCountArray().map((id) => ({
      abi: MARKETPLACE_ABI as Abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [id],
    })),
  });

  const { data: shoeListData } = useReadContracts({
    contracts: shoeMapping?.map((shoe: any) => ({
      abi: MARKETPLACE_ABI as Abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_isSoldOut",
      args: [shoe.result[0]],
    })),
  });

  useEffect(() => {
    if (shoeMapping && shoeListData) {
      let result = shoeMapping.map((item: any) => {
        return item.result;
      });
      let filteredResult = result.filter((item: any, index: number) => {
        return Number(item[0]) !== 0 && !shoeListData[index].result;
      });
      setShoeList(filteredResult);
      setCalledContract(true);
    }
  }, [shoeListData]);

  const returnPrice = async () => {
    console.log("FETCHING THE PRICE");
    try {
      const res = await fetch("/api/ethPrice");
      if (!res.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const resData = await res.json();
      console.log(resData);
      setEthUsdPrice(resData.price);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    returnPrice();
  }, []);

  return (
    <>
      <div className="container place-items-center w-[60vw] h-[65vh] border-4 border-black p-5 overflow-y-scroll relative">
        {calledContract ? (
          shoeList && shoeList?.length > 0 ? (
            <>
              {shoeList?.map((shoe, i) => (
                <Item item={shoe} usdPrice={Number(ethUsdPrice)} key={i} />
              ))}
            </>
          ) : (
            <p className="mx-auto my-auto text-xl">No shoes available!</p>
          )
        ) : (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-white">
            <div className="text-center">
              <div className="flex justify-center items-center h-8 w-full">
                <CircleLoading />
              </div>
              <p className="text-black text-2xl mt-4">Loading shoes</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
