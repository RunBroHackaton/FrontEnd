import { ChangeEvent } from "react"

export default function ItemModal({
  item,
  showModal,
  setShowModal,
}: {
  item: any;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}) {
  if (!showModal) return null;

  const close = (e : ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "modal") {
      setShowModal(false);
    }
  };

  console.log(item)

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-opacity backdrop-blur-sm flex justify-center items-center"
      onClick={close}
    >
      <div className="w-[700px] h-[500px] flex flex-rows py-10 rounded-lg bg-cyan-800">
        <Image           loader={() =>
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          src={
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          alt="Image from IPFS" width={300} height={270} />
          <div>
            <p>{`Shoe ${item[0]}`}</p>
            <p>{`Name ${item[1]}`}</p>
            <p>{`Company ${item[2]}`}</p>
            <p>{`Price ${item[4]}`}</p>
            <p>{`RB_Factor ${item[5]}`}</p>
            <p>{`Quantity ${item[6]}`}</p>
          </div>
      </div>
    </div>
  );
}
