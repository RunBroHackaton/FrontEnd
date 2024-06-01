import FitnessData from "@/components/FitnessData";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ShoeCollection from "@/components/ShoeColletion";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 space-y-16">
      <p>Your Shoe - Nike Gold Edition</p>
      <div className="flex flex-row">
        <ShoeCollection />
        <div className="flex flex-col">
          <p>Your Fitness Data from 1st May</p>
          <FitnessData />
          <Link href="/dashboard/rewards">
            <button className="actionButton">Calculate RB Token Earned</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
