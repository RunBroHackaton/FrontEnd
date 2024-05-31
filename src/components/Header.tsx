import Link from "next/link";
import User from "./User";

export default function Header() {
  return (
    <div className="mx-[10vw] mt-[5vh] h-[10vh] bg-red-500 flex justify-between px-16 rounded-sm items-center">
      <Link href="/">
        <p className="text-3xl">RunBro !</p>
      </Link>
      <User />
    </div>
  );
}
