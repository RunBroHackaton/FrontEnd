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

  return session?.user?.name && path !== "/" ? (
    <div className="flex flex-row items-center justify-center space-x-8 self-end mr-[5%]">
      {!path.includes("companies") ? (
        <div
          className="w-32"
          onMouseEnter={() => {
            setTimeout(() => {
              setLogout(true);
            }, 300);
          }}
          onMouseLeave={() => {
            setLogout(false);
          }}
        >
          <div
            className="bg-black text-white w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer emailIcon transition-all duration-700 ease-out hover:w-32 overflow-hidden"
            onClick={() => {
              signOut();
            }}
          >
            <p className="text-center">
              {logout ? "LOGOUT" : session.user.name[0].toUpperCase()}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {path !== "/companies" ? <ConnectButton chainStatus="icon" /> : <></>}
    </div>
  ) : (
    <UserLogin />
  );
}
