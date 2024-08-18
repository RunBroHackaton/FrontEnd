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
        className={`h-[55px] w-[240px] border-[4px] border-[#6E94EB] text-black rounded-3xl cursor-pointer transition-all duration-300 ease-out ${path == `/companies/${href}` ? "bg-[#EA5B46BF]" : "hover:bg-[#ea5c4685]"} flex`}
      >
        <p className="text-3xl text-center mx-auto my-auto">{name}</p>
      </div>
    </Link>
  );
}
