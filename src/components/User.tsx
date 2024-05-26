"use client"
import { signOut, useSession } from "next-auth/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from "next/navigation";

export default function User() {
    const { data: session } = useSession();
    const path = usePathname()
  

    return (session?.user?.name && path !== "/" ? (
            <div className="flex flex-row items-center justify-center space-x-8">
                <div className="bg-green-500 w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer emailIcon" onClick={() => {signOut()}}>
                    <p className="text-center">{session.user.name[0].toUpperCase()}</p>
                </div>
                <ConnectButton />
            </div>
        ) : (
            <></>
        )
    );
}