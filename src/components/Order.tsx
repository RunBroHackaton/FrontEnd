import Image from "next/image";

export default function Order({ item }: any) {
  return (
    <div className="flex flex-row h-[120px] w-full text-black border-black border-y-2 items-center justify-around">
      <div className="relative h-[100px] w-[100px]">
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
      <div>
        <p>{`Id: ${item[0]}`}</p>
        <p>{`Brand: ${item[1]}`}</p>
        <p>{`Name: ${item[2]}`}</p>
      </div>
      <div>
        <p>{`Price: ${Number(item[4]) / 10 ** 18}`}</p>
        <p>{`Power: ${Number(item[5]) / 10 ** 18}`}</p>
        <p>{`Lister: ${item[6].toString()}`}</p>
      </div>
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <div
            className={`h-[20px] w-[20px] rounded-full ${item[10].toString() == "true" ? "bg-green-500" : "bg-red-500"}`}
          ></div>
          <p>{`Confirmed by buyer`}</p>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <div
            className={`h-[20px] w-[20px] rounded-full ${item[11].toString() == "true" ? "bg-green-500" : "bg-red-500"}`}
          ></div>
          <p>{`Confirmed by seller`}</p>
        </div>
        <button className="bg-green-500 h-[25px] w-[150px] rounded-3xl text-sm mt-2">
          CONFIRM DELIVERY
        </button>
      </div>
    </div>
  );
}
{
  /* <div className="relative h-[120px] w-[150px] border-[#6E94EB80] border-[5px]">
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
</div> */
}
