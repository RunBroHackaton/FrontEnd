import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import UserDashboard from "@/components/UserDashboard";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 space-y-16">
      <p className="heading">
        Your Shoe Collection Dashboard
      </p>
      <UserDashboard />
    </div>
  );
}
