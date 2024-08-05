export default function Filter() {
  return (
    <div className="flex flex-col w-[300px]">
      <p className="bg-[#FFD449] py-1 px-1 text-black text-3xl text-center">
        Filter
      </p>
      <div className="bg-white flex flex-col space-y-1 w-full">
        <p className="border-b-gray-400 border-b-2">Brand</p>
        <p>Gender</p>
        <p>Price</p>
      </div>
    </div>
  );
}
