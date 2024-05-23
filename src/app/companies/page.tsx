"use client"
import { useState } from "react"

export default function Companies() {
    const [Name, setName] = useState("")
    const [Location, setLocation] = useState("")
    const [KYC, setKYC] = useState("")

    return (
        <form className="flex-1 flex justify-center items-center flex-col" onSubmit={() => {}}>
            <p>Enter your company Details</p>
            <input placeholder="Name" className="companyDetails"></input>
            <input placeholder="Location" className="companyDetails"></input>
            <input placeholder="KYC" className="companyDetails"></input>
            <input type="submit" value={"SUBMIT"} className="py-2 px-4 bg-red-500 rounded-2xl mt-10 cursor-pointer"/>
        </form>
    )
}