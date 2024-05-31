import Image from "next/image";

export default function Item({
  item,
  selectItem,
}: {
  item: any;
  selectItem: (item: any) => void;
}) {
  console.log(item);

  function expo(x: any, f: any) {
    return Number.parseFloat(x).toExponential(f);
  }

  return (
    <div className="bg-red-500/80 border hover:bg-red-500 cursor-pointer border-red-500 rounded-lg p-1 transition-all duration-100 ease-out" onClick={selectItem(item)}>
      <div className="relative h-[100px] w-[140px] border border-red-500 rounded-sm">
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
      <div className="text-center text-xs mt-1">
        <p className="border-b-black w-16 mx-auto border-b">Price</p>
        <p>
          {Number(item[4]) / 100000 > 1
            ? expo(Number(item[4]), 4)
            : Number(item[4])}
        </p>
        <p className="border-b-black w-16 mx-auto border-b">Factor</p>
        <p>
          {Number(item[5]) / 100000 > 1
            ? expo(Number(item[5]), 4)
            : Number(item[5])}
        </p>
      </div>
    </div>
  );
}
