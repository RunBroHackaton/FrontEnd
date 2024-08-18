"use client";

import Image from "next/image";
import SellerPageOption from "./SellerPageOption";
import { useRouter } from "next/navigation";

export default function SellerNavBar() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-evenly w-3/12 h-[60vh] items-end text-black">
      <div className="cursor-pointer" onClick={() => router.back()}>
        <Image src="/Back_arrow.png" height={80} width={80} alt="Back arrow" />
      </div>
      <SellerPageOption href="list" name="List New Item" />
      <SellerPageOption href="listings" name="Current Listings" />
      <SellerPageOption href="shipped" name="Shipped Items" />
      <SellerPageOption href="orders" name="Orders" />
      <SellerPageOption href="register" name="Register" />
      <p className="text-2xl font-extralight">VENDOR DASHBOARD</p>
    </div>
  );
}
