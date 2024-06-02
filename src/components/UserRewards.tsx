import Convert from "./Convert";

export default function UserRewards() {
  return (
    <>
      <div className="flex flex-row w-full justify-evenly items-center">
        <div className="flex flex-col text-center">
          <p className="text-lg">Total rewards</p>
          <div className="border h-0 border-red-500 w-20 mx-auto shadow-sm shadow-red-500"></div>
          <p className="text-3xl">16 RB</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-lg">Rewards to claim</p>
          <div className="border h-0 border-red-500 w-20 mx-auto shadow-sm shadow-red-500"></div>
          <p className="text-3xl">8 RB</p>
        </div>
      </div>
      <Convert />
    </>
  );
}
