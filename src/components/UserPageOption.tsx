"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserPageOption({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  const path = usePathname();
  return (
    <Link href={`/dashboard/${href}`}>
      <div
        className={`transition-all duration-300 rounded-l-2xl h-[55px] w-[240px] bg-[#E4EBFA] flex justify-center items-center ${path.includes(href) ? "font-bold text-orange-500" : "hover:text-orange-500"}`}
      >
        <p className="text-3xl text-center mx-auto my-auto">{name}</p>
      </div>
    </Link>
  );
}
