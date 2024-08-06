import Image from "next/image";

export default function Item({
  item,
  selectItem,
}: {
  item: any;
  selectItem: any;
}) {
  function expo(x: any, f: any) {
    return Number.parseFloat(x).toExponential(f);
  }

  console.log(item);

  return (
    <div
      className="bg-white text-black cursor-pointer p-1 transition-all duration-200 ease-out h-[250px] w-[200px] border border-gray-300/90 flex flex-col justify-around rounded-md"
      onClick={() => {
        selectItem(item);
      }}
    >
      <div className="relative h-[130px] w-[180px] border-black border-4 mx-auto">
        <Image
          loader={() =>
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          src={
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          alt="Image from IPFS"
          fill
        />
      </div>
      <div className="text-center text-xs mt-1 h-max justify-evenly flex flex-col">
        <p className="text-base">
          {item[1]} {item[2]}
        </p>
        <p className="text-base font-bold">{Number(item[4]) / 10 ** 18} WETH</p>
      </div>
    </div>
  );
}
