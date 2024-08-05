import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ItemList from "@/components/ItemList";
import { lilita_one } from "@/ui/Fonts";
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
      <Filter />
      <p className="heading">Purchase a shoe to Run and Earn!</p>
      <ItemList />
      <Link href="/dashboard">
        <button className="actionButton">Go To Your Dashboard</button>
      </Link>
    </div>
  );
}
