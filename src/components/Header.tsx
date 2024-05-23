import User from "./User";

export default function Header() {
    return(
        <div className="mx-[10vw] mt-[5vh] h-[70px] bg-red-500 flex justify-between px-16 rounded-sm items-center">
            <p>RunBro{" "}!</p>
            <User />
        </div>
    )
}