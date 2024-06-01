import Convert from "./Convert";

export default function UserRewards() {
  return (
    <div className="flex-1 flex flex-col items-center px-16 py-10">
      <p>16 RB</p>
      <div className="flex flex-row">
        <p>Market</p>
        <p>1 RB = 0.00025 WETH</p>
      </div>
      <Convert />
    </div>
  );
}
