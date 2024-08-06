import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ItemList from "@/components/ItemList";
import Filter from "@/components/Filter";

export default async function Marketplace() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  } else {
    console.log(session);
  }

  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly">
      <p className="text-3xl text-black">Purchase Gear to Run & Earn Tokens</p>
      <div className="flex flex-row">
        <Filter />
        <ItemList />
      </div>
    </div>
  );
}
