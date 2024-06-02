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

  return (
    <div
      className="bg-black border text-white hover:bg-red-500 cursor-pointer border-white rounded-lg p-1 transition-all duration-200 ease-out"
      onClick={() => {
        selectItem(item);
      }}
    >
      <div className="relative h-[100px] w-[140px] rounded-sm">
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
        <p className="border-b-white w-16 mx-auto border-b">Price</p>
        <p>{Number(item[4]) / 10 ** 18} ETH</p>
        <p className="border-b-white w-16 mx-auto border-b">Factor</p>
        <p>{Number(item[5]) / 10 ** 18}</p>
      </div>
    </div>
  );
}
