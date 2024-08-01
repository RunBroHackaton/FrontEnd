"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function UserLogin() {
  return (
    <div
      className="loginButton googleLogin border-2 border-green-600 flex justify-center items-center space-x-2 cursor-pointer self-end mr-[5%]"
      onClick={() =>
        signIn("google", {
          callbackUrl: `${process.env.NEXT_PUBLIC_URL}/marketplace`,
        })
      }
    >
      <Image
        src="/googleIcon.png"
        height={20}
        width={20}
        alt="google Icon"
        className="inline-block"
      />
      <p className="inline">Login with Google Account</p>
    </div>
  );
}
