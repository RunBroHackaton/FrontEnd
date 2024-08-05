"use client";
import { signOut, useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserLogin from "./UserLogin";

export default function User() {
  const { data: session } = useSession();
  const path = usePathname();

  const [logout, setLogout] = useState(false);

  return (
    <div className="h-[50px] flex justify-end w-full">
      {path !== "/" ? (
        <div className="mr-[5%]">
          <ConnectButton chainStatus="icon" />
        </div>
      ) : (
        <UserLogin />
      )}
    </div>
  );
}
