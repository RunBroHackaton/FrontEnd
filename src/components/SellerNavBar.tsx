import SellerPageOption from "./SellerPage";

export default function SellerNavBar() {
  return (
    <div className="flex flex-col justify-evenly w-3/12 h-[40vh] items-end text-black">
      <SellerPageOption href="list" name="List New Item" />
      <SellerPageOption href="listings" name="Current Listings" />
      <SellerPageOption href="shipped" name="Shipped Items" />
      <SellerPageOption href="orders" name="Orders" />
      <SellerPageOption href="register" name="Register" />
    </div>
  );
}
