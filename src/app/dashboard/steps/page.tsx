import UserSteps from "@/components/UserSteps";

export default async function Steps() {
  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly bg-[#E4EBFA] w-10/12 h-[70vh] ml-3 rounded-3xl">
      <p className="text-4xl font-bold text-transparent from-[#FFD449] to-[#FF007A] bg-gradient-to-r bg-clip-text">
        REDEEM STEPS
      </p>
      <UserSteps />
    </div>
  );
}
