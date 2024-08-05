"use client";

import { Abi, Address } from "viem";
import { useReadContract, useAccount, useReadContracts } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { useEffect, useState } from "react";
import Shoe from "./Shoe";

export default function ShoeCollection({ setSelectedShoe }: any) {
  const [collection, setCollection] = useState<any[]>([]);

  const { address } = useAccount();

  const { data: ownerShoeIds } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "getShoeIdsOwnedByUser",
    args: [address],
  }) as { data: bigint[] | undefined };

  const { data: shoes } = useReadContracts({
    contracts: (ownerShoeIds ?? []).map((shoeId: bigint) => ({
      abi: abi as Abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [shoeId],
    })),
  }) as { data: any };

  const selectShoe = (shoe: any) => {
    setSelectedShoe(shoe);
  };

  useEffect(() => {
    if (shoes) {
      let shoeArray = shoes.map((shoe: any) => {
        return shoe.result;
      });
      setCollection(shoeArray);
    }
  }, [shoes]);

  return (
    <>
      <div className="h-[70vh] w-[450px] flex flex-col border-[20px] border-[#FFFFFF] rounded-2xl rounded-tl-none py-2 overflow-y-scroll bg-[#E4EBFA]">
        {collection && collection.length > 0 ? (
          <>
            {collection.map((shoe, i) => (
              <Shoe item={shoe} selectItem={selectShoe} key={i} />
            ))}
          </>
        ) : (
          <p className="mx-auto my-auto text-center text-black text-xl">
            No shoes available in collection
          </p>
        )}
      </div>
    </>
  );
}
