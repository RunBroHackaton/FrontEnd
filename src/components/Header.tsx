"use client";

import Link from "next/link";
import User from "./User";
import { lilita_one } from "@/ui/Fonts";
import Image from "next/image";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col pt-2">
      {path.includes("marketplace") ? (
        <>
          <div className="flex flex-row">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <Image
                src="/Back_arrow.png"
                height={80}
                width={80}
                alt="Back arrow"
              />
            </div>
            <User />
          </div>
          <div className="mt-2 h-[10vh] border-y-[1vh] border-black flex rounded-sm items-center bg-[#EA5B46] text-black drop-shadow-lg">
            <p
              className={`${lilita_one.className} text-6xl text-black ml-[10vw]`}
            >
              <Link href="/">RunBro!</Link>
            </p>

            <Image
              src="/RunBroLogo.png"
              alt="Run Bro Logo"
              width={180}
              height={180}
              className="mr-[1%]"
            />
            <Link href="/marketplace">
              <p className="text-5xl">Marketplace</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <User />
          <div className="mt-2 h-[10vh] flex justify-center rounded-sm items-center bg-[#FFD449] drop-shadow-lg">
            <Image
              src="/RunBroLogo.png"
              alt="Run Bro Logo"
              width={180}
              height={180}
              className="mr-[1%]"
            />
            <Link href="/">
              <p className={`${lilita_one.className} text-6xl text-black`}>
                RunBro !
              </p>
            </Link>
            <NavBar />
          </div>
        </>
      )}
    </div>
  );
}
