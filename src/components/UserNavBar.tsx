"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import UserPageOption from "./UserPageOption";

export default function UserNavBar() {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-evenly w-3/12 h-[60vh] items-end text-black">
      <div
        className="h-[60px] w-[60px] cursor-pointer relative"
        onClick={() => router.back()}
      >
        <Image src="/Back_Button.png" alt="Back button" fill />
      </div>
      <UserPageOption name="My Rewards" href="rewards" />
      <UserPageOption name="My Steps" href="steps" />
      <UserPageOption name="My Wishlist" href="wishlist" />
      <UserPageOption name="Shipping Info" href="shipping" />
      <UserPageOption name="My Orders" href="orders" />
      <div className="text-white text-2xl font-extralight">DASHBOARD</div>
    </div>
  );
}
