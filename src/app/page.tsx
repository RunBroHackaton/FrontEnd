import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center flex-col text-black w-full">
      <p className="text-2xl pt-[30px] pb-[5px] font-black">
        Welcome Dweb Techies who have the Google Fit App!
      </p>
      <div className="flex-1 flex flex-row w-full">
        <div className="w-[35%] flex flex-col justify-evenly items-center">
          <Image
            src="/PeopleRunning.png"
            alt="People running"
            width={500}
            height={500}
          />
          <p className="max-w-[400px] text-xl px-[10px]">
            RunBro Marketplace Vendors must apply and be approved by our
            community before being listed on our platform....
          </p>
          <Link href="/companies/register">
            <div className="loginButton registerLogin border-2 border-red-700 flex justify-center items-center">
              <p className="text-center">Register</p>
            </div>
          </Link>
        </div>
        <div className="w-[65%] flex flex-col justify-evenly">
          <div className="flex flex-row items-center justify-evenly">
            <p className="text-lg max-w-[600px] px-[10px]">
              RunBro lets you use the Google Fit App on your phone to connect to
              your crypto wallet on any laptop browser except Safari. RunBro is
              a D’app on the ETH platform. Once you log in via the gmail account
              connected to your Google Fit data, you will be in your RunBro
              Dashboard where you track the steps you run, walk or trod and earn
              ETH thru our daily token conversion... With more ETH in your
              Wallet, you can buy items from the RunBro Marketplace. There you
              will find the best running gear from our community approved
              vendors, who will include big brands and new emerging companies
              from around the world!
            </p>
            <Image
              src="/GoogleFit.png"
              alt="Google fit logo"
              width={200}
              height={200}
            />
          </div>
          <p className="text-3xl font-bold text-center">
            EARN TOKENS FOR RUNNING!
          </p>
          <Image
            src="/Marketplace.png"
            alt="Marketplace preview"
            width={500}
            height={200}
          />
        </div>
      </div>
    </main>
  );
}
