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
    >
      <p className="text-xl">{`Shoe ${item[0]}`}</p>
      <p>{`Name: ${item[1]}`}</p>
      <p>{`Company: ${item[2]}`}</p>
      <p>{`Price: ${item[4]}`}</p>
      <p>{`RB_Factor: ${item[5]}`}</p>
      <p>{`Quantity: ${item[6]}`}</p>
    </div>
  );
}
