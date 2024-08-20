"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { Abi, Address } from "viem";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../../../contract_abis/MarketPlace.json";
import Order from "@/components/Order";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

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

  useEffect(() => {
    console.log(shoes);
    if (shoes) {
      let shoeArray = shoes.map((shoe: any) => {
        return shoe.result;
      });
      setOrders(shoeArray);
    }
  }, [shoes]);

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-10 justify-evenly bg-[#E4EBFA] w-10/12 h-[70vh] ml-3 rounded-3xl">
      {orders.length > 0 ? (
        orders.map((shoe, i) => <Order item={shoe} seller={false} key={i} />)
      ) : (
        <p className="mx-auto my-auto text-black text-2xl">No orders yet!</p>
      )}
    </div>
  );
}
