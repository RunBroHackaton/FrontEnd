"use client";

import { Address } from "viem";
import { useReadContract, useAccount, useReadContracts } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { useEffect, useState } from "react";
import Shoe from "./Shoe";

export default function ShoeCollection({ setSelectedShoe }: any) {
  const [collection, setCollection] = useState<any[]>([]);

  const { address } = useAccount();

  const { data: ownerShoeId } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "getShoeIdsOwnedByUser",
    args: [address],
  });

  const { data: shoes } = useReadContracts({
    contracts: (ownerShoeIds ?? []).map((shoeId: bigint) => ({
      abi: abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [shoeId],
    })),
  });

  useEffect(() => {
    console.log(ownerShoeIds)
  }, [ownerShoeIds])

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
      <div className="h-[60vh] w-[40vw] flex flex-col border-4 border-red-500 shoeListContainer rounded-2xl py-2">
        {collection && collection.length > 0 ? (
          <>
            {collection.map((shoe) => (
              <Shoe item={shoe} selectItem={selectShoe} />
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
