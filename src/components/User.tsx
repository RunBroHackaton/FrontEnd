"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function User() {
    const { data: session } = useSession();

    return (session?.user?.name ? (
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