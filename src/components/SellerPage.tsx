"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerPageOption({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  const path = usePathname();
  return (
    <Link href={`/companies/${href}`}>
      <div
        className={`h-[40px] w-[200px] border-[4px] border-[#6E94EB] text-black rounded-2xl cursor-pointer transition-all duration-300 ease-out ${path == `/companies/${href}` ? "bg-[#EA5B46BF]" : "hover:bg-[#ea5c4685]"}`}
      >
        <p className="text-2xl text-center">{name}</p>
      </div>
    </Link>
  );
}
