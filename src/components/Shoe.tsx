"use client";

import Image from "next/image";

export default function Shoe({
  item,
  selectItem,
}: {
  item: any;
  selectItem: (item: any) => void;
}) {
  return (
    <div
      onClick={() => {
        selectItem(item);
      }}
      className="text-black flex flex-row w-full mt-2 py-1 px-7 cursor-pointer transition-all duration-150 ease-out hover:bg-gray-400"
    >
      <div className="relative h-[120px] w-[150px] border-[#6E94EB80] border-[5px]">
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
          fill
          alt={`Shoe ${item[0]} picture`}
        />
      </div>
      <div className="text-sm ml-2 my-auto">
        <p>{`Shoe ${item[0]}`}</p>
        <p>{`Brand: ${item[1]}`}</p>
        <p>{`Name: ${item[2]}`}</p>
        <p>{`Price: ${Number(item[4]) / 10 ** 18}`}</p>
        <p>{`Power: ${Number(item[5]) / 10 ** 18}`}</p>
      </div>
    </div>
  );
}
