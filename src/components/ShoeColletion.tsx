"use client";

import { Address } from "viem";
import { useReadContract, useAccount, useReadContracts } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import { useEffect, useState } from "react";
import Shoe from "./Shoe";
import RedeemModal from "./RedeemModal";

export default function ShoeCollection() {
  const [collection, setCollection] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState("");

  const { address } = useAccount();

  const { data: ownerShoeIds } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "getShoeIdsOwnedByUser",
    args: [address],
  });

  const { data: shoes } = useReadContracts({
    contracts: ownerShoeIds?.map((shoeId: any) => ({
      abi: abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [shoeId],
    })),
  });

  const selectShoe = (shoe: any) => {
    setSelectedShoe(shoe);
  };

  useEffect(() => {
    console.log(ownerShoeIds);
  }, [ownerShoeIds]);

  useEffect(() => {
    if (shoes) {
      setCollection(shoes.result);
    }
  }, [shoes]);

  return (
    <>
      <div className="h-[1000px] w-[500px] flex flex-col">
        {collection ? (
          <>
            {collection.map((shoe) => (
              <Shoe item={shoe} selectItem={selectShoe} />
            ))}
          </>
        ) : (
          <p className="mx-auto my-auto text-center">
            No shoes available in collection
          </p>
        )}
      </div>
      <RedeemModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={selectedShoe}
      />
    </>
  );
}
