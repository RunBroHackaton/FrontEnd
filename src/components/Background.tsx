"use client";

import { usePathname } from "next/navigation";

export default function Background() {
  const path = usePathname();

  return (
    <div
      className={`absolute z-0 w-screen h-screen top-0 ${path.includes("dashboard") ? "bg-[#6E94EB]" : "bg-[#E4EBFA]"}`}
    ></div>
  );
}
