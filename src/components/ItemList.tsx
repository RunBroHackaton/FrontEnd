"use client";

import Item from "@/components/Item";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import MARKETPLACE_ABI from "../../contract_abis/MarketPlace.json";
import { Address, Abi } from "viem";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";

export default function ItemList() {
  const [shoeList, setShoeList] = useState<any[] | null>([]);

  const [quantity, setQuantity] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const selectItem = (item : any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const getShoeCountArray = () => {
    const end = Number(shoeCount);
    const start = 0;
    return Array.from({ length: end - start + 1 }, (v, k) => k + start);
  };

  const { data: shoeCount } = useReadContract({
    abi: MARKETPLACE_ABI,
    address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
    functionName: "s_shoeCount",
  });

  const { data: shoeMapping } = useReadContracts({
    contracts: getShoeCountArray().map((id) => ({
      abi: MARKETPLACE_ABI as Abi,
      address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
      functionName: "s_shoes",
      args: [id],
    })),
  });

  useEffect(() => {
    if (shoeMapping) {
      console.log(shoeMapping);
      let result = shoeMapping.map((item: any) => {
        return item.result;
      });
      console.log(result);
      let filteredResult = result.filter((item: any) => {
        return Number(item[0]) !== 0;
      });
      console.log(filteredResult);
      setShoeList(filteredResult);
    }
  }, [shoeMapping]);

  return (
    <>
      <div className="grid auto-rows-min auto-cols-max grid-cols-5 gap-10 place-items-center w-[75vw] h-[50vh] bg-gray-300 shadow-md shadow-red-500 p-5">
        {shoeList && shoeList?.length > 0 ? (
          <>{shoeList?.map((shoe) => <Item item={shoe} selectItem={selectItem} />)}</>
        ) : (
          <p className="absolute top-1/2 right-auto">No shoes available!</p>
        )}
      </div>
      <ItemModal
        item={selectedItem}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}
