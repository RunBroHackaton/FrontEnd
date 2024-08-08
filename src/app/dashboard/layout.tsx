import UserNavBar from "@/components/UserNavBar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-row items-center">
      <UserNavBar />
      <div className="flex-1 w-9/12">{children}</div>
    </div>
  );
}
