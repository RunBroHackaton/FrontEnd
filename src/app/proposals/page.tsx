import Link from "next/link";

export default function Proposals() {
  return (
    <div className="flex-1 w-full flex flex-row justify-center items-center space-x-10">
      <Link href="/proposals/proposing">
        <div className="h-[50px] text-2xl w-[200px] text-black bg-[#6E94EB] rounded-2xl text-center transition-all duration-300 ease-out hover:bg-blue-500 flex justify-center items-center">
          Propose
        </div>
      </Link>
      <Link href="/proposals/voting">
        <div
          className="h-[50px] text-2xl w-[200px] text-black bg-[#6E94EB] rounded-2xl text-center transition-all duration-300 ease-out hover:bg-blue-500 flex justify-center items-center"
        >
          Vote
        </div>
      </Link>
    </div>
  );
}
