"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import UserLogin from "./UserLogin";

export default function User() {
  const path = usePathname();

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
