import SellerNavBar from "@/components/SellerNavBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-row items-center">
      <SellerNavBar />
      <div className="flex-1 w-9/12">{children}</div>
    </div>
  );
}
