import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Marketplace() {

    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/")
    }
    
    return (
        <main>
            <p>Purchase a shoe to Run and Earn!</p>
            <p>Popular Shoes</p>
            {/* <ItemList /> */}
            <button>Buy</button>
            <button>Go To Your Dashboard</button>
        </main>
    )
}