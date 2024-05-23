"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";


export default async function Home() {

  return (
    <main className="flex-1 flex justify-center items-center flex-col space-y-16">
      <div>
        <p className="ml-1">For users</p>
        <button className="loginButton border-2 border-gray-800 " onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/marketplace"})}>
          Login with Google Account
        </button>
      </div>
      <div>
        <p className="ml-1">For Companies/Investors</p>
        <Link href="/companies">
          <div className="loginButton border-2 border-red-700">
            <p className="text-center">Register</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
