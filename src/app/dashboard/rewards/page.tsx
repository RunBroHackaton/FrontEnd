import UserRewards from "@/components/UserRewards";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Rewards() {

    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/")
    }

    return (
        <div className="flex-1 flex flex-col items-center px-16 py-10">
            <p>Total Rewards Earned</p>
            <UserRewards />  
        </div>
    )
}