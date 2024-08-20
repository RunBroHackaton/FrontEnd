"use client";

import Link from "next/link";
import User from "./User";
import { archivo_black, lilita_one } from "@/ui/Fonts";
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
            {/* <p
              className={`${archivo_black.className} text-6xl text-black ml-[10vw]`}
            >
              <Link href="/">RunBro!</Link>
            </p> */}
            <Link href="/" className="ml-[10vw]">
              <Image
                src="/RunBRO_text_logo_600x300.png"
                alt="RUNBRO"
                height={175}
                width={175}
              />
            </Link>
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
          <div className="mt-2 h-[10vh] flex rounded-sm items-center bg-[#FFD449] drop-shadow-lg">
            <Image
              src="/RunBroLogo.png"
              alt="Run Bro Logo"
              width={180}
              height={180}
              className="ml-[5vw]"
            />
            {/* <Link href="/">
              <p
                className={`${archivo_black.className} text-6xl text-black ml-[5vw]`}
              >
                RunBro!
              </p>
            </Link> */}
            <Link href="/" className="ml-[1vw]">
              <Image
                src="/RunBRO_text_logo_600x300.png"
                alt="RUNBRO"
                height={175}
                width={175}
              />
            </Link>
            <NavBar />
          </div>
        </>
      )}
    </div>
  );
}
