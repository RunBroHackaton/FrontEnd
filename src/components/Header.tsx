import Link from "next/link";
import User from "./User";
import { luckiest_guy, titan, fira_sans, lilita_one } from "@/ui/Fonts";
import Image from "next/image";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <div className="flex flex-col pt-2">
      <User />
      <div className="mt-2 h-[10vh] flex justify-center rounded-sm items-center bg-[#FFD449]">
        <Image
          src="/RunBroLogo.png"
          alt="Run Bro Logo"
          width={180}
          height={180}
          className="mr-[1%]"
        />
        <Link href="/">
          <p className={`${lilita_one.className} text-6xl text-white`}>
            RunBro !
          </p>
        </Link>
        <NavBar />
      </div>
    </div>
  );
}
