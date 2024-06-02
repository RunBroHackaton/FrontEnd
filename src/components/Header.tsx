import Link from "next/link";
import User from "./User";
import { luckiest_guy, titan, fira_sans, lilita_one } from "@/ui/Fonts";

export default function Header() {
  return (
    <div className="header mt-[5vh] h-[10vh] flex justify-between px-16 rounded-sm items-center">
      <Link href="/">
        <p className={`${lilita_one.className} text-4xl text-white`}>
          RunBro !
        </p>
      </Link>
      <User />
    </div>
  );
}
