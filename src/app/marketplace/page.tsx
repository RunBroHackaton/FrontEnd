import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ItemList from "@/components/ItemList";
import Filter from "@/components/Filter";
import Image from "next/image";

export default async function Marketplace() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  } else {
    console.log(session);
  }

  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly">
      <div className="flex flex-row border-red-200">
        <div className="flex flex-col">
          <Image
            src="/RB_Race_Track.png"
            alt="Race track image"
            height={200}
            width={200}
            className="self-end"
          />
          <Filter />
        </div>
        <div className="flex flex-col">
          <p className="text-3xl text-black text-end mr-[5%]">
            Purchase Gear to Run & Earn Tokens
          </p>
          <ItemList />
        </div>
      </div>
    </div>
  );
}
