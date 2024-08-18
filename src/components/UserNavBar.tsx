"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

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
      <Link href="/dashboard/collection">
        <p
          className={`text-3xl transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes("collection") ? "font-black text-orange-500" : "hover:text-orange-500"}`}
        >
          My Collection
        </p>
      </Link>
      <Link href="/dashboard/wishlist">
        <p
          className={`text-3xl transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes("wishlist") ? "font-black text-orange-500" : "hover:text-orange-500"}`}
        >
          My WishList
        </p>
      </Link>
      <Link href="/dashboard/rewards">
        <p
          className={`text-3xl transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes("rewards") ? "font-black text-orange-500" : "hover:text-orange-500"}`}
        >
          My Rewards
        </p>
      </Link>
      <Link href="/dashboard/shipping">
        <p
          className={`text-3xl transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes("shipping") ? "font-black text-orange-500" : "hover:text-orange-500"}`}
        >
          Shipping Info
        </p>
      </Link>
      <Link href="/dashboard/orders">
        <p
          className={`text-3xl transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes("orders") ? "font-black text-orange-500" : "hover:text-orange-500"}`}
        >
          My Orders
        </p>
      </Link>
      <div className="text-white text-2xl font-extralight">DASHBOARD</div>
    </div>
  );
}
