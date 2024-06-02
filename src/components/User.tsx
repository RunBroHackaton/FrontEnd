"use client";
import { signOut, useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function User() {
  const { data: session } = useSession();
  const path = usePathname();

  const [logout, setLogout] = useState(false);

  //   const { connect, connectors } = useConnect();
  //   const { isConnected } = useAccount();

  //   useEffect(() => {
  //     if (
  //       (path !== "/" || path !== "/companies") &&
  //       !isConnected &&
  //       connectors.length > 0
  //     ) {
  //       connect({ connector: injected() });
  //     }
  //   }, [connect, connectors, isConnected]);

  //   useEffect(() => {
  //     console.log(path);
  //   }, [path]);

  return session?.user?.name && path !== "/" ? (
    <div className="flex flex-row items-center justify-center space-x-8">
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
    <></>
  );
}
