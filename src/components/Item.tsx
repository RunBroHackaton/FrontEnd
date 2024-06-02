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
      className="bg-sky-200 group text-black border hover:bg-slate-950 hover:text-white cursor-pointer border-white rounded-lg p-1 transition-all duration-200 ease-out shadow-lg shadow-slate-950"
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
        <p className="border-b-black w-16 mx-auto border-b group-hover:border-b-white">
          Price
        </p>
        <p>{Number(item[4]) / 10 ** 18} ETH</p>
        <p className="border-b-black w-16 mx-auto border-b group-hover:border-b-white">
          Factor
        </p>
        <p>{Number(item[5]) / 10 ** 18}</p>
      </div>
    </div>
  );
}
