import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Item({
  item,
  usdPrice,
}: {
  item: any;
  usdPrice: number;
}) {
  const router = useRouter();

  return (
    <div
      className="bg-white text-black cursor-pointer p-1 transition-all duration-200 ease-out h-[250px] w-[200px] border border-gray-300/90 flex flex-col justify-around rounded-md hover:shadow-md shadow-gray-300"
      onClick={() => {
        router.push(`/marketplace/${item[0]}`);
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
        <p className="text-sm text-gray-500">
          <span className="text-xs">≈</span>{" "}
          {((Number(item[4]) / 10 ** 18) * usdPrice).toFixed(2)}
          {"$"}
        </p>
      </div>
    </div>
  );
}
