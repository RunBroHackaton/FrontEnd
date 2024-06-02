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

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const selectItem = (item: any) => {
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
    }
  }, [shoeListData]);

  return (
    <>
      <div className="container place-items-center w-[75vw] h-[50vh] border-4 border-red-500 rounded-3xl shoeListContainer p-5">
        {shoeList && shoeList?.length > 0 ? (
          <>
            {shoeList?.map((shoe, i) => (
              <Item item={shoe} selectItem={selectItem} key={i} />
            ))}
          </>
        ) : (
          <p className="mx-auto my-auto text-xl">No shoes available!</p>
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
