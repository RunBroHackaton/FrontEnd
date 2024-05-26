"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <main className="flex-1 flex justify-center items-center flex-col space-y-16">
      <div>
        <p className="ml-1">For users</p>
        <div className="loginButton border-2 border-gray-800 flex justify-center items-center space-x-2 cursor-pointer" onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/marketplace"})}>
          <Image src="/googleIcon.png" height={20} width={20} alt="google Icon" className="inline-block" />
          <p className="inline">Login with Google Account</p>
        </div>
      </div>
      <div>
        <p className="ml-1">For Companies/Investors</p>
        <Link href="/companies">
          <div className="loginButton border-2 border-red-700 flex justify-center items-center">
            <p className="text-center">Register</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
