"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  return (
    <div className="flex flex-row text-2xl space-x-4 ml-[20%]">
      <Link href="/about">
        <p className={`${path.includes("about") ? "font-bold" : ""}`}>ABOUT</p>
      </Link>
      <Link href="/marketplace">
        <p className={`${path.includes("marketplace") ? "font-bold" : ""}`}>
          SHOP
        </p>
      </Link>
      <Link href="/">
        <p className={`${path.includes("") ? "font-bold" : ""}`}>VENDOR</p>
      </Link>
    </div>
  );
}
