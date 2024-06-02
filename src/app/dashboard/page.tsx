import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import UserDashboard from "@/components/UserDashboard";
import { lilita_one } from "@/ui/Fonts";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 space-y-16">
      <p className={`heading ${lilita_one.className}`}>
        Your Shoe Collection Dashboard
      </p>
      <UserDashboard />
    </div>
  );
}
