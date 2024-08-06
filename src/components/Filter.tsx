export default function Filter() {
  return (
    <div className="flex flex-col w-[300px] space-y-5">
      <p className="bg-[#FFD449] py-1 px-1 text-black text-3xl text-center w-[150px] mx-auto rounded-3xl">
        Filter
      </p>
      <div className="bg-white flex flex-col space-y-1 w-full text-black py-8">
        <p className="border-b-gray-400 border-b-2 w-10/12 mx-auto">Brand</p>
        <p className="border-b-gray-400 border-b-2 w-10/12 mx-auto">Gender</p>
        <p className="border-b-gray-400 border-b-2 w-10/12 mx-auto">Price</p>
      </div>
    </div>
  );
}
