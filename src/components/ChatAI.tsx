"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChatAI() {
  const path = usePathname();
  return (
    <>
      {path.includes("marketplace") || path == "/" ? (
        <></>
      ) : (
        <div className="absolute bottom-[5%] right-[3%] flex flex-col justify-center items-center">
          <Link
            href="https://3xethical-runbro.personal.ai/messaging/profile"
            target="_blank"
          >
            <Image src="/RB_AI.png" height={90} width={90} alt="our own ai" />
          </Link>
          <p className="text-base text-black w-[100px]">CHAT WITH RUNBRO AI</p>
        </div>
      )}
    </>
  );
}
