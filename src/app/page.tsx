"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center flex-col">
      <div className="mt-[10vh] text-center">
        <p className="text-3xl heading">
          Get started with RunBro and earn while you run!{" "}
        </p>
        <p className="w-[550px] text-lg mt-6 mx-auto">
          RunBro is a platform where users can buy shoes from verified sellers
          to get rewards in RB token. To use our app the user needs to download
          and sync Google Fit app which tracks their health data.
        </p>
      </div>
      <div className="flex flex-col space-y-10 mt-[5vh]">
        <div>
          <p className="ml-1">For users</p>
          <div
            className="loginButton googleLogin border-2 border-green-600 flex justify-center items-center space-x-2 cursor-pointer"
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
        </div>
        <div>
          <p className="ml-1">For Companies/Investors</p>
          <Link href="/companies">
            <div className="loginButton registerLogin border-2 border-red-700 flex justify-center items-center">
              <p className="text-center">Register</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
