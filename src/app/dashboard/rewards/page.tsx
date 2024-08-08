import UserRewards from "@/components/UserRewards";

export default async function Rewards() {
  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly bg-[#E4EBFA] w-10/12 h-[70vh] ml-3 rounded-3xl">
      <p className="text-4xl font-black text-transparent from-[#FFD449] to-[#FF007A] bg-gradient-to-r bg-clip-text">
        REWARDS EARNED
      </p>
      <UserRewards />
    </div>
  );
}
