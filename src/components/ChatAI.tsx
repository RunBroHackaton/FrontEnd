import Image from "next/image";
import Link from "next/link";

export default function ChatAI() {
  return (
    <div className="absolute bottom-[5%] right-[3%] flex flex-col justify-center items-center">
      <Link href="https://3xethical-runbro.personal.ai/messaging/profile">
        <Image src="/RB_AI.png" height={90} width={90} alt="our own ai" />
      </Link>
      <p className="text-base text-black w-[100px]">CHAT WITH RUNBRO AI</p>
    </div>
  );
}
