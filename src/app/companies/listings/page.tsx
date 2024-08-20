"use client";

import { useEffect, useState } from "react";
import { Abi, Address } from "viem";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../../../contract_abis/MarketPlace.json";
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
} from "wagmi";
import CircleLoading from "@/ui/CircleLoading";
import Item from "@/components/Item";

export default function Listings() {
  const [shoeList, setShoeList] = useState<any[] | null>([]);
  const [ethUsdPrice, setEthUsdPrice] = useState("");
  const [calledContract, setCalledContract] = useState<boolean>(false);

  const getShoeCountArray = () => {
    const end = Number(shoeCount);
    const start = 0;
    return Array.from({ length: end - start + 1 }, (v, k) => k + start);
  };

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { address } = useAccount();

  const { data: shoeCount } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "s_shoeCount",
    blockNumber: blockNumber,
  });

  const { data: shoeMapping } = useReadContracts({
    contracts: getShoeCountArray().map((id) => ({
      abi: abi as Abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [id],
    })),
  });

  const { data: shoeListData } = useReadContracts({
    contracts: shoeMapping?.map((shoe: any) => ({
      abi: abi as Abi,
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
        return (
          Number(item[0]) !== 0 &&
          !shoeListData[index].result &&
          item[7] == address
        );
      });
      console.log("filtered array", filteredResult);
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
    <div className="flex-1 items-center px-4 border-[#6E94EB] border-[5px] rounded-md h-[70vh] mx-[2%] w-10/12 grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 py-[2%] overflow-y-scroll relative">
      {calledContract ? (
        shoeList && shoeList?.length > 0 ? (
          <>
            {shoeList?.map((shoe, i) => (
              <Item item={shoe} usdPrice={Number(ethUsdPrice)} key={i} />
            ))}
          </>
        ) : (
          <p className="absolute inset-0 flex justify-center items-center bg-white text-black text-center">
            No shoes available!
          </p>
        )
      ) : (
        <div className="absolute inset-0 flex justify-center items-center bg-white">
          <div className="text-center">
            <div className="flex justify-center items-center h-8 w-full">
              <CircleLoading />
            </div>
            <p className="text-black text-2xl mt-4">Loading shoes</p>
          </div>
        </div>
      )}
    </div>
  );
}
