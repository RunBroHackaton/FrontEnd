import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Marketplace() {

    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/")
    } else {
        console.log(session)
    }
    
    return (
        <div className="flex-1 flex flex-col items-center px-16 py-10">
            <p>Purchase a shoe to Run and Earn!</p>
            <p>Popular Shoes</p>
            {/* <ItemList /> */}
            <button className="actionButton">Buy</button>
            <Link href="/dashboard">
                <button className="actionButton">Go To Your Dashboard</button>
            </Link>
        </div>
    )
}