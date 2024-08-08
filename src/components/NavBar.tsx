"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  return (
    <div className="flex flex-row text-2xl space-x-4 ml-[20%]">
      <Link href="/about">
        <p className={`${path.includes("/about") ? "font-bold" : ""}`}>ABOUT</p>
      </Link>
      <Link href="/marketplace">
        <p className={`${path.includes("marketplace") ? "font-bold" : ""}`}>
          SHOP
        </p>
      </Link>
      {path.includes("dashboard") ? (
        <div
          onClick={() => {
            signOut();
          }}
        >
          <p className="cursor-pointer">LOGOUT</p>
        </div>
      ) : (
        <Link href="/companies/list">
          <p className={`${path.includes("companies") ? "font-bold" : ""}`}>
            VENDOR
          </p>
        </Link>
      )}
    </div>
  );
}
